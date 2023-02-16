import { EventBus } from './EventBus';
import { v4 as uuid } from 'uuid'

export class Component<Props extends Record<string, any> = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  id = uuid();
  eventBus: () => EventBus;
  props: Props;
  children: Record<string, any>
  _element: DocumentFragment;

  constructor(propsAndChildren: Props) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildren(propsAndChildren)

    const _children = children as Props;

    this.children = this._makePropsProxy(_children);
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = new DocumentFragment();
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._removeEvents();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  //@ts-ignore
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    const { props, children } = this._getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.props, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (this._element) {
      this._element.appendChild(block);
      this._addEvents();
    }
  }

  private _addEvents() {
    const {events = {}} = this.props;
    const element = this._element.firstElementChild

    Object.keys(events).forEach(eventName => {
      element && element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const {events = {}} = this.props;
    const element = this._element.firstElementChild

    Object.keys(events).forEach(eventName => {
      element && element.addEventListener(eventName, events[eventName]);
    });
  }

  compile(template: (context: any) => string, context: any) {
    const templateNode = { ...context };
    Object.entries(this.children).forEach(([key, component]) => {
      if (Array.isArray(component) && component.length > 0) {
        templateNode[key] = component.map(item => `<div data-id="${item.id}"></div>`)
      } else {
        templateNode[key] = `<div data-id="${component.id}"></div>`
      }
    });

    const nodes = document.createElement('template');
    nodes.innerHTML = template(templateNode);

    Object.entries(this.children).forEach(([_, component]) => {
      let newNodes;
      if (Array.isArray(component) && component.length > 0) {
        component.forEach(item => {
          newNodes = nodes.content.querySelector(`[data-id="${item.id}"]`)

          if (!newNodes) {
            return
          }

          newNodes.replaceWith(item.getContent())
        });
      } else {
        newNodes = nodes.content.querySelector(`[data-id="${component.id}"]`);

        if (!newNodes) {
          return
        }

        newNodes.replaceWith(component.getContent());
      }
    });

    return nodes.content;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private _getChildren(propsAndChildren: Record<string, any>) {
    const children: Record<string, unknown> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component || (Array.isArray(value) && value.every(item => item instanceof Component))) {
        children[key as string] = value
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as Props };
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value) {
        const oldTarget = { ...target }
        target[prop as keyof Props] = value;
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      }
    });
  }
}

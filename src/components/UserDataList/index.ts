import { compileComponent, Component } from '../../utils';
import template from './UserDataList';
import Input from '../core/Input';

interface IUserDataListProps {
  itemsInit: Record<string, string>[];
  items?: Input | Input[]
}

class UserDataList extends Component<IUserDataListProps> {
  constructor(props: IUserDataListProps) {
    const items = props.itemsInit.map((item) => {
      const { placeholder, name, value } = item;
      return new Input({
        className: '',
        placeholder,
        name,
        value,
        theme: 'profile',
      });
    });

    super({ items, ...props});
  }

  private templateNode(args: null | Record<string, string | string[]>) {
    return compileComponent(template, { ...args });
  }

  componentDidUpdate(oldProps: IUserDataListProps, newProps: IUserDataListProps) {
    if (oldProps['itemsInit'] !== newProps['itemsInit']) {
      console.log('update done!')
      this.children.items = newProps['itemsInit'].map((item) => {
        const { placeholder, name, value } = item;
        return new Input({
          className: '',
          placeholder,
          name,
          value,
          theme: 'profile',
        });
      });
    }

    return oldProps['itemsInit'] !== newProps['itemsInit']
  }

  render() {
    const { items } = this.props;
    console.log(this.props)
    return this.compile(this.templateNode, { items })
  }
}

export default UserDataList;

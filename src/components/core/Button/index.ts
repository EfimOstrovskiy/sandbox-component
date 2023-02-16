import * as styles from './Button.module.scss';

import { compileComponent, Component } from '../../../utils';
import template from './Button';
import cn from 'classnames';

interface IButtonProps {
  className: string;
  value: string | HTMLElement;
  theme?: string;
  events?: Record<string, (event: Event) => void>
}

class Button extends Component<IButtonProps> {
  constructor(props: IButtonProps) {
    super(props);
  }

  private templateNode(args: null | Record<string, string | string[]>) {
    return compileComponent(template, { ...args });
  }

  render() {
    const { className, value, theme = 'default'} = this.props;
    const rootClassName = cn(className, {
      [styles.Transparent]: theme === 'transparent',
      [styles.Primary]: theme === 'default'
    });

    return this.compile(this.templateNode, { className: rootClassName, value, theme })
  }
}

export default Button;

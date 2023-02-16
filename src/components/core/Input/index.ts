import * as styles from './Input.module.scss';

import { compileComponent, Component } from '../../../utils';
import template from './Input';
import cn from "classnames";

interface IInputProps {
  className: string;
  placeholder: string;
  name: string;
  value: string;
  theme?: string;
  events?: Record<string, (event: Event) => void>
}

class Input extends Component<IInputProps> {
  constructor(props: IInputProps) {
    super(props);
  }

  private templateNode(args: null | Record<string, string | string[]>) {
    return compileComponent(template, { ...args });
  }

  render() {
    const { className, placeholder, name, value, theme = 'auth'} = this.props;
    const rootClassName = cn(className, {
      [styles.Auth]: theme === 'auth',
      [styles.Profile]: theme === 'profile'
    });
    const type = name === 'password' ? 'password' : 'text';

    return this.compile(this.templateNode, { className: rootClassName, placeholder, type, name, value });
  }
}

export default Input;

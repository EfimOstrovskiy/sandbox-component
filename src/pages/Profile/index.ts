import * as styles from './Profile.module.scss';

import { compileComponent, Component } from '../../utils';
import template from './Profile';
import UserDataList from '../../components/UserDataList';
import Button from '../../components/core/Button';

interface IProfileProps {
  backProfile?: Button;
  userData?: UserDataList | UserDataList[];
  changeData?: Button;
  changePassword?: Button;
  exit?: Button;
}

const itemsInit = [
  { placeholder: 'Почта', name: 'email', value: 'admin@mail.ru' },
  { placeholder: 'Логин', name: 'login', value: 'admin' },
  { placeholder: 'Имя', name: 'first_name', value: 'Ефим' },
  { placeholder: 'Фамилия', name: 'second_name', value: 'Островский' },
  { placeholder: 'Имя в чате', name: 'display_name', value: 'RuMIN' },
  { placeholder: 'Телефон', name: 'phone', value: '+79993955535' },
];

class Profile extends Component<IProfileProps> {
  constructor(props: IProfileProps = {}) {
    const userData = new UserDataList({ itemsInit });
    const changeData = new Button({
      className: styles.Button,
      value: 'Изменить данные',
      theme: 'transparent',
      events: {
        click: () => {
          userData.setProps({
            itemsInit: [
              { placeholder: 'Имя', name: 'first_name', value: 'Ефим' },
              { placeholder: 'Фамилия', name: 'second_name', value: 'Островский' }
            ]
          })
        }
      }
    });

    super({
      userData,
      changeData,
      ...props
    });
  }

  private templateNode(args: null | Record<string, string | string[]>) {
    return compileComponent(template, { ...args });
  }

  render() {
    const { userData, changeData } = this.props;

    return this.compile(this.templateNode, {
      name: 'Ефим Островский',
      userData,
      changeData
    });
  }
}

export default Profile;

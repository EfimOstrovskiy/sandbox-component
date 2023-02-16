import * as styles from './Profile.module.scss';

import PROFILE_ICON from '../../../public/images/icons/profile.svg'

const template = `
  <div class="${styles.Root}">
    <div class="${styles.Profile}">
      <div class="${styles.User}">
        <div class="${styles.Photo}">
          <img src="${PROFILE_ICON}" alt="Фото профиля" />
        </div>
        <h4 class="${styles.Name}">{#name#}</h4>
        <form class="${styles.Form}">
          {#userData#}
          {#changeData#}
        </form>
      </div>
    </div>
  </div>
`;

export default template;

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
      <p>Какие страницыы должны быть в fullscreen или только 
должны ли мы делать задача с заменой элментов заглушек, если у нас нет заглушек
вопрос по теории. Какие страницыы должны быть в fullscreen или только 
должны ли мы делать задача с заменой элментов заглушек, если у нас нет заглушек
вопрос по теории
</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
    </div>
  </div>
`;

export default template;

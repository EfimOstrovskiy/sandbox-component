import * as styles from './Input.module.scss';

import cn from 'classnames';

const template = `
  <div class="${cn(styles.Root, '{#className#}')}">
    <label class="${styles.Label}">{#placeholder#}</label>
    <input type="{#type#}" class="${styles.Input}" name="{#name#}" value="{#value#}" />
    <span class="${styles.Error}"></span>
  </div>
`;

export default template;

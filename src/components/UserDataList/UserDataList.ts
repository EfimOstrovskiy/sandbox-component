import * as styles from './UserDataList.module.scss';

import cn from 'classnames';

const template = `
  <div class="${cn(styles.Root, '{#className#}')}">
    {#items#}
  </div>
`;

export default template;

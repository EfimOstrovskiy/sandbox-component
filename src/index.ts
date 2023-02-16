import './main.scss';

import { renderComponent } from './utils';
import Profile from './pages/Profile';

renderComponent('root', new Profile().getContent());

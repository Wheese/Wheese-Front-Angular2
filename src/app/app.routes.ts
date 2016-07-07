import { provideRouter, RouterConfig }  from '@angular/router';
import { Home } from './Home/Home';
import { About } from './About/About';

const routes: RouterConfig = [

  {path: '', component: Home},
  {path: 'about', component: About}

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

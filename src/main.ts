import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';

if ('production' === process.env.ENV) {
  enableProdMode();
}

import {App} from './app/app.component';

bootstrap(App, [
  APP_ROUTER_PROVIDERS
]);

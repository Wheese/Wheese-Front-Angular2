import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

if ('production' === process.env.ENV) {
  enableProdMode();
}

import {App} from './app/App';

bootstrap(App, []);

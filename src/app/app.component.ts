import {Component} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import {FORM_PROVIDERS} from '@angular/common';

import {Home} from './Home/Home.ts';

import './App.scss';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <router-outlet></router-outlet>
    `
})

export class App {

}

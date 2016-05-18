import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {Home} from './Home/Home';

import './App.scss';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES],
    template: `

    <router-outlet></router-outlet>

  `
})
@RouteConfig([
    {path: '/',         component: Home,    name: 'Home'}
])

export class App {

}

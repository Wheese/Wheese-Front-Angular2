import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {Header} from '../components/Header/Header';

@Component({
  selector: 'home',
  directives: [ROUTER_DIRECTIVES, Header],
  template: require('./Home.html'),
  styles: [require("./Home.scss").toString()]
})

export class Home {

}

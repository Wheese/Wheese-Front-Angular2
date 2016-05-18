import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Header} from '../components/Header/Header';

@Component({
  selector: 'home',
  directives: [Header],
  template: require('./Home.html'),
  styles: [require("./Home.scss").toString()]
})

export class Home {

}

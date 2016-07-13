import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Header} from '../components/Header/Header';
import {Rating} from '../components/Rating/rating'; 

@Component({
  selector: 'home',
  directives: [Header, Rating],
  template: require('./Home.html'),
  styles: [require("./Home.scss").toString()]
})

export class Home {

}

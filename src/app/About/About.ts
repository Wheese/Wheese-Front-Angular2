import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

import {Header} from '../components/Header/Header';

@Component({
  selector: 'about',
  directives: [Header],
  template: require('./About.html'),
  styles: [require("./About.scss").toString()]
})

export class About {

}

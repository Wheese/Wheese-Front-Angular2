import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FORM_PROVIDERS} from '@angular/common';

@Component({
    selector: 'app-header',
    template: require('./Header.html'),
    styles: [require("./Header.scss").toString()]
})

export class Header {

}

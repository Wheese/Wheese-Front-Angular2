import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'app-header',
    directives: [ROUTER_DIRECTIVES],
    template: require('./Header.html'),
    styles: [require("./Header.scss").toString()]
})

export class Header {

}

import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

@Component({
    selector: 'app-header',
    directives: [ROUTER_DIRECTIVES],
    template: require('./Header.html'),
    styles: [require("./Header.scss").toString()]
})

export class Header {

}

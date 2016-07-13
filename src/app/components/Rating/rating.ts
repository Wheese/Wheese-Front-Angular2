import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'app-rating',
    template: require('./rating.html'),
    styles: [require("./rating.scss").toString()]
})

export class Rating {

}

/**
 * Created by Alex Tranchenko on 17.10.2016.
 */
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'page-404',
    template: '<h1 class="page-404">404. Page not found!</h1>',
    styleUrls:['page-404.component.css']
})
export class Page404Component implements OnInit {
    constructor() { }

    ngOnInit() { }
    
}
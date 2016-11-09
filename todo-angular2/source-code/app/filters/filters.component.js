var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import { TodosService } from "../services/todos.service/todos.service";
import { AppComponent } from "../AppComponent";
var FiltersComponent = (function () {
    function FiltersComponent(todoService, listItems) {
        this.allTodo = listItems;
        this.todoService = todoService;
    }
    FiltersComponent.prototype.ngOnInit = function () {
    };
    return FiltersComponent;
}());
FiltersComponent = __decorate([
    Component({
        selector: 'filters',
        template: "<ul class=\"list todos__list\">\n                    <router-outlet></router-outlet>\n                </ul>\n                <ul class=\"filters__nav\">\n                    <li class=\"filters__item\"><a md-raised-button color=\"primary\" routerLink=\"all\" routerLinkActive=\"active\" class=\"filters__link animated\">All</a></li>\n                    <li class=\"filters__item\"><a md-raised-button color=\"accent\" routerLink=\"active\" routerLinkActive=\"active\" class=\"filters__link animated\">Active</a></li>\n                    <li class=\"filters__item\"><a md-raised-button routerLink=\"completed\" routerLinkActive=\"active\" class=\"filters__link animated\">Completed</a></li>\n                    <li class=\"filters__item\"><a md-raised-button (click)=\"itemVisibility ? itemVisibility = false : itemVisibility = true\"  type=\"submit\"  class=\" filters__link animated\">Del. Completed</a></li>\n                </ul>\n                <cap [style.display]=\"itemVisibility ? 'block' : 'none'\"></cap>\n                <m-w-del-all-done class=\"animated__long\" [style.display]=\"itemVisibility ? 'block' : 'none'\" ></m-w-del-all-done>"
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(AppComponent)),
    __metadata("design:paramtypes", [TodosService,
        AppComponent])
], FiltersComponent);
export { FiltersComponent };
//# sourceMappingURL=filters.component.js.map
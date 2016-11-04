var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Alex Tranchenko on 17.10.2016.
 */
import { Component } from '@angular/core';
var Page404Component = (function () {
    function Page404Component() {
    }
    Page404Component.prototype.ngOnInit = function () { };
    return Page404Component;
}());
Page404Component = __decorate([
    Component({
        moduleId: module.id,
        selector: 'page-404',
        template: '<h1 class="page-404">404. Page not found!</h1>',
        styleUrls: ['page-404.component.css']
    }),
    __metadata("design:paramtypes", [])
], Page404Component);
export { Page404Component };
//# sourceMappingURL=404.component.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Page404Component } from "./core/404.component/404.component";
import { ActiveFilterComponent } from "./filters/active.filter.component";
import { ComplitedFilterComponent } from "./filters/complited.filter.component";
import { TodoComponent } from "./todo.item/todo.component";
var routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: TodoComponent },
    { path: 'active', component: ActiveFilterComponent },
    { path: 'completed', component: ComplitedFilterComponent },
    { path: '**', component: Page404Component }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: [],
        providers: [],
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app_routing.module.js.map
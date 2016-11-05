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
import { ComplitedFilterComponent } from "./complited.filter.component";
import { ActiveFilterComponent } from "./active.filter.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FiltersComponent } from "./filters.component";
import { AppRoutingModule } from "../app_routing.module";
import { TodosService } from "../services/todos.service/todos.service";
var FiltersModule = (function () {
    function FiltersModule() {
    }
    return FiltersModule;
}());
FiltersModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            AppRoutingModule
        ],
        exports: [
            ActiveFilterComponent,
            ComplitedFilterComponent,
            FiltersComponent,
        ],
        declarations: [
            ActiveFilterComponent,
            ComplitedFilterComponent,
            FiltersComponent
        ],
        providers: [TodosService],
    }),
    __metadata("design:paramtypes", [])
], FiltersModule);
export { FiltersModule };
//# sourceMappingURL=filters.module.js.map
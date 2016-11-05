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
import { TodosService } from "../services/todos.service/todos.service";
import { AppComponent } from "../AppComponent";
import { TodoComponent } from "../todo/todo.component";
var ComplitedFilterComponent = (function () {
    function ComplitedFilterComponent(todoService, todoCmpnt, listItems) {
        this.allTodo = listItems;
        this.todoService = todoService;
        this.todoCmpnt = todoCmpnt;
    }
    ComplitedFilterComponent.prototype.ngOnInit = function () {
        this.todos = this.todoService.listItems;
    };
    ComplitedFilterComponent.prototype.trackByTodo = function (index, todo) {
        return todo.id;
    };
    ComplitedFilterComponent.prototype.checkTodo = function (state, id) {
        this.todoCmpnt.checkTodo(state, id);
    };
    ComplitedFilterComponent.prototype.rmTodo = function (index) {
        this.todoCmpnt.rmTodo(index);
    };
    return ComplitedFilterComponent;
}());
ComplitedFilterComponent = __decorate([
    Component({
        template: "<li *ngFor=\"let todo of todos; let idx = index; trackBy: trackByTodo\" [class.hidden]=\"!todo.done\" class=\"todos__item\">{{todo.value}}\n                    <input  [(ngModel)]=\"todo.done\" (change)=\"checkTodo(!todo.done, idx)\" type='checkbox' class='todos__checkbox todos__checkbox_sub'>\n                    <button (click)=\"rmTodo(idx)\" class='todos__checkbox todos__checkbox_del animated>'></button>\n                </li>",
        providers: [TodoComponent]
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(TodoComponent)),
    __param(2, Inject(AppComponent)),
    __metadata("design:paramtypes", [TodosService,
        TodoComponent,
        AppComponent])
], ComplitedFilterComponent);
export { ComplitedFilterComponent };
//# sourceMappingURL=complited.filter.component.js.map
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
var TodoComponent = (function () {
    function TodoComponent(todoService, listItems) {
        this.allTodo = listItems;
        this.todoService = todoService;
    }
    TodoComponent.prototype.ngOnInit = function () {
        this.todos = this.todoService.listItems;
    };
    TodoComponent.prototype.trackByTodo = function (index, todo) {
        return todo.id;
    };
    TodoComponent.prototype.checkTodo = function (state, id) {
        var states = [this.allTodo.isChecked];
        this.allTodo.isChecked = this.todoService.checkItem(state, id, states)[0];
    };
    TodoComponent.prototype.rmTodo = function (index) {
        var states = [this.allTodo.isChecked, this.allTodo.hide, this.allTodo.isHidden];
        _a = this.todoService.rmItem(index, states), this.allTodo.isChecked = _a[0], this.allTodo.hide = _a[1], this.allTodo.isHidden = _a[2];
        var _a;
    };
    TodoComponent.prototype.edit = function (el, index, value) {
        this.todoService.edit(el, index, value);
    };
    TodoComponent.prototype.open = function (ev, todoState) {
        this.todoService.openCloseEditable(ev, todoState);
    };
    TodoComponent.prototype.escape = function (el) {
        this.todoService.hideEl(el);
    };
    return TodoComponent;
}());
TodoComponent = __decorate([
    Component({
        template: "<li (click)=\"open($event, todo.done)\" *ngFor=\"let todo of todos; let idx = index; trackBy: trackByTodo; \" class=\"todos__item\">{{todo.value}}\n                    <input  [(ngModel)]=\"todo.done\" (change)=\"checkTodo(!todo.done, idx)\" type='checkbox' class='todos__checkbox todos__checkbox_sub'>\n                    <button (click)=\"rmTodo(idx)\" class='todos__checkbox todos__checkbox_del animated>'></button>\n                    <div class='todos__edit_item animated__long'>\n                        <input (keyup.enter)=\"edit(inputTodo, idx, inputTodo.value);\" (keyup.escape)=\"escape(inputTodo)\" #inputTodo [value]=\"todo.value\" type='text' class='todos__edit' autofocus>\n                    </div>\n                </li>",
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(AppComponent)),
    __metadata("design:paramtypes", [TodosService,
        AppComponent])
], TodoComponent);
export { TodoComponent };
//# sourceMappingURL=todo.component.js.map
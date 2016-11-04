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
        this.todos = this.allTodo.listItems;
    };
    TodoComponent.prototype.trackByTodo = function (index, todo) {
        return todo.id;
    };
    TodoComponent.prototype.checkTodo = function (state, id) {
        this.todoService.highlightTodo(this.allTodo.listItems, state, id);
        this.todoService.setLocalStorage(this.allTodo.listItems);
        this.allTodo.isChecked = this.todoService.matchAllAndDone(this.allTodo.listItems);
    };
    TodoComponent.prototype.rmTodo = function (index) {
        this.todoService.removeTodo(this.allTodo.listItems, index);
        this.todoService.setLocalStorage(this.allTodo.listItems);
        this.allTodo.isChecked = this.todoService.matchAllAndDone(this.allTodo.listItems);
        this.allTodo.quantityTodos = this.allTodo.listItems.length;
    };
    TodoComponent.prototype.edit = function (el, index, value) {
        if (this.todoService.inputValidation(value)) {
            this.todoService.editTodo(this.allTodo.listItems, index, value);
            this.todoService.setLocalStorage(this.allTodo.listItems);
            this.todoService.hideEl(el);
        }
    };
    TodoComponent.prototype.open = function (ev) {
        this.todoService.openEl(ev);
    };
    TodoComponent.prototype.escape = function (el) {
        this.todoService.hideEl(el);
    };
    return TodoComponent;
}());
TodoComponent = __decorate([
    Component({
        template: "<li (dblclick)=\"open($event);\" *ngFor=\"let todo of todos; let idx = index; trackBy: trackByTodo\" \n               class=\"todos__item\">{{todo.value}}{{isActive}}\n                    <input  [(ngModel)]=\"todo.done\" (change)=\"checkTodo(!todo.done, idx)\" type='checkbox' class='todos__checkbox todos__checkbox_sub'>\n                    <button (click)=\"rmTodo(idx)\" class='todos__checkbox todos__checkbox_del animated>'></button>\n                    <div class='todos__edit_item animated__long' title='Double-click to edit a Todo' >\n                        <input (keyup.enter)=\"edit(input, idx, input.value);\" (keyup.escape)=\"escape(input);\" #input [value]=\"todo.value\" type='text' class='todos__edit' autofocus>\n                    </div>\n                </li>",
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(AppComponent)),
    __metadata("design:paramtypes", [TodosService,
        AppComponent])
], TodoComponent);
export { TodoComponent };
//# sourceMappingURL=todo.component.js.map
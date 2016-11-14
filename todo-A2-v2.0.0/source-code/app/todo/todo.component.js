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
import { ErrorHandlerService } from "../services/error.handler.service/error.handler.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var TodoComponent = (function () {
    function TodoComponent(todoService, listItems, errorH) {
        this.filter = true;
        this.filterId = true;
        this.allTodo = listItems;
        this.todoService = todoService;
    }
    TodoComponent.prototype.ngOnInit = function () { };
    TodoComponent.prototype.trackByTodo = function (index, todo) {
        return todo.id;
    };
    TodoComponent.prototype.hightlightFilter = function (targetEl) {
        document.querySelectorAll('.filters__link').forEach(function (el, idx, arr) {
            el.classList.remove('act');
        });
        targetEl.classList.add('act');
    };
    TodoComponent.prototype.checkTodo = function (state, id, userId) {
        var states = [this.allTodo.isChecked];
        this.allTodo.isChecked = this.todoService.checkItem(state, id, states, userId)[0];
    };
    TodoComponent.prototype.rmTodo = function (index, userId, el) {
        var _this = this;
        var states = [this.allTodo.isChecked, this.allTodo.hide, this.allTodo.isHidden];
        el.parentNode.style.opacity = '0';
        el.parentNode.style.marginLeft = '100%';
        setTimeout(function () {
            _a = _this.todoService.rmItem(index, states, userId), _this.allTodo.isChecked = _a[0], _this.allTodo.hide = _a[1], _this.allTodo.isHidden = _a[2], _this.allTodo.quantityTodos = _a[3];
            var _a;
        }, 500);
    };
    TodoComponent.prototype.edit = function (el, index, value, userId) {
        this.todoService.edit(el, index, value, userId);
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
        selector: 'all-todos',
        template: "<li (click)=\"open($event, todo.done)\" *ngFor=\"let todo of this.allTodo.todos; let idx = index; trackBy: trackByTodo;\" \n             [class.hide_todo]=\"filter ? filterId ? false : todo.done : !todo.done\"  class=\"todos__item animated__long\">{{todo.value}}\n        <input  [(ngModel)]=\"todo.done\" (change)=\"checkTodo(!todo.done, idx, this.allTodo.userId)\" type='checkbox' class='todos__checkbox todos__checkbox_sub'>\n        <button (click)=\"rmTodo(idx, this.allTodo.userId, $event.target)\"  class='todos__checkbox todos__checkbox_del animated>'></button>\n        <div class='todos__edit_item animated__long'>\n            <input (keyup.enter)=\"edit(inputTodo, idx, inputTodo.value, this.allTodo.userId);\" (keyup.escape)=\"escape(inputTodo)\" #inputTodo [value]=\"todo.value\" type='text' class='todos__edit' autofocus>\n        </div>\n    </li>\n    <ul class=\"filters__nav\">\n        <li class=\"filters__item\"><a md-raised-button (click)=\"filter = true; filterId = true; hightlightFilter($event.target);\" class=\"filters__link animated act\">All</a></li>\n        <li class=\"filters__item\"><a md-raised-button (click)=\"filter = true; filterId = false; hightlightFilter($event.target);\" class=\"filters__link animated\">Active</a></li>\n        <li class=\"filters__item\"><a md-raised-button (click)=\"filter = false; hightlightFilter($event.target);\" class=\"filters__link animated\">Completed</a></li>\n        <li class=\"filters__item\"><a md-raised-button (click)=\"this.allTodo.itemVisibility ? this.allTodo.itemVisibility = false : this.allTodo.itemVisibility = true\" type=\"submit\"  class=\" filters__link animated\">Del. Completed</a></li>\n    </ul>",
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(AppComponent)),
    __param(2, Inject(ErrorHandlerService)),
    __metadata("design:paramtypes", [TodosService,
        AppComponent,
        ErrorHandlerService])
], TodoComponent);
export { TodoComponent };
//# sourceMappingURL=todo.component.js.map
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
import { TodosService } from "./services/todos.service/todos.service";
import { ErrorHandlerService } from "./services/error.handler.service/error.handler.service";
var AppComponent = (function () {
    function AppComponent(todoService, errorH) {
        this.errorH = errorH;
        this.todoService = todoService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.todoInit();
        this.isChecked = this.todoService.matchAllAndDone(this.listItems);
        this.quantityTodos = this.listItems.length;
    };
    AppComponent.prototype.todoInit = function () {
        this.savedObj = JSON.parse(this.todoService.getData());
        if (typeof (this.savedObj) === 'object' && this.savedObj !== null) {
            this.listItems = this.savedObj;
            this.isHidden = true;
            (this.listItems.length) ? this.id = this.listItems[this.listItems.length - 1].id + 1 : this.id = 0;
        }
        else {
            this.isHidden = false;
            this.listItems = [];
            this.id = 0;
        }
    };
    AppComponent.prototype.counter = function () {
        return this.id++;
    };
    AppComponent.prototype.checkAllFunc = function (state) {
        this.checkAll = state;
        this.todoService.highlightTodo(this.listItems, this.checkAll);
        this.todoService.setLocalStorage(this.listItems);
        this.isChecked = this.todoService.matchAllAndDone(this.listItems);
    };
    AppComponent.prototype.onSubmit = function (val) {
        if (this.todoService.inputValidation(val)) {
            this.isHidden = true;
            var todo = { id: this.counter(), value: val, done: false };
            this.listItems.push(todo);
            this.todoService.setLocalStorage(this.listItems);
            this.isChecked = this.todoService.matchAllAndDone(this.listItems);
            this.quantityTodos = this.listItems.length;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'app-root',
        styleUrls: ['app.component.css'],
        template: "<section class=\"wrapper\">\n        <div class=\"todos\">\n            <h1 class=\"todos__header\">To Do List</h1>\n            <div id=\"todos__body-id\" class=\"todos__body rel__item\">\n                <input type=\"text\" #name (keyup.enter)=\"onSubmit(name.value); name.value=''; $event.stopPropagation();\" class=\"todos__item\" placeholder=\"Add a to-do...\" [autofocus]=\"'true'\">\n                <input type=\"checkbox\" (click)=\"checkAllFunc(mainCheckBox.checked)\" [checked]=\"isChecked\" #mainCheckBox [class.hidden]=\"isHidden\"  class=\"todos__checkbox todos__checkbox_main\">\n                    <filters></filters>\n                <span class=\"filters__count\">Total to do: {{quantityTodos}}</span>\n            </div>\n            <div class=\"rules\">Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>\n        </div>\n    </section>",
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(ErrorHandlerService)),
    __metadata("design:paramtypes", [TodosService,
        ErrorHandlerService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=AppComponent.js.map
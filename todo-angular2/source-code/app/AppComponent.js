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
        this.appState = this.todoService.appInit();
        this.appCmpntInit(this.appState);
        this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
        this.quantityTodos = this.todoService.listItems.length;
    };
    AppComponent.prototype.appCmpntInit = function (state) {
        if (state) {
            this.isHidden = true;
            this.hide = false;
        }
        else {
            this.isHidden = false;
            this.hide = true;
        }
    };
    AppComponent.prototype.checkAllFunc = function (state) {
        this.checkAll = state;
        this.todoService.highlightTodo(this.todoService.listItems, this.checkAll);
        this.todoService.setLocalStorage(this.todoService.listItems);
        this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
    };
    AppComponent.prototype.onSubmit = function (val) {
        if (this.todoService.inputValidation(val)) {
            this.todoService.addItem(val);
            this.isHidden = true;
            this.hide = false;
            this.todoService.setLocalStorage(this.todoService.listItems);
            this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
            this.quantityTodos = this.todoService.listItems.length;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'app-root',
        styleUrls: ['app.component.css'],
        template: "<section class=\"wrapper\">\n        <div class=\"todos\">\n            <h1 class=\"todos__header\">To Do List</h1>\n            <div id=\"todos__body-id\" class=\"todos__body rel__item\">\n                <input type=\"text\" #name (keyup.enter)=\"onSubmit(name.value); name.value=''; $event.stopPropagation();\" class=\"todos__item\" placeholder=\"Add a to-do...\" [autofocus]=\"'true'\">\n                <input type=\"checkbox\" (click)=\"checkAllFunc(mainCheckBox.checked)\" [checked]=\"isChecked\" #mainCheckBox [class.hidden]=\"isHidden\"  class=\"todos__checkbox todos__checkbox_main\" title=\"Active / Done\">\n                <filters [class.hide]=\"hide\"></filters>\n                <span [class.hide]=\"hide\" class=\"filters__count\">Total to do: {{quantityTodos}}</span>\n            </div>\n            <div [class.hide]=\"hide\" class=\"rules\" >Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>\n        </div>\n    </section>",
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(ErrorHandlerService)),
    __metadata("design:paramtypes", [TodosService,
        ErrorHandlerService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=AppComponent.js.map
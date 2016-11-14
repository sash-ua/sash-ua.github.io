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
import { AuthService } from "./services/auth/auth.service";
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import { FB } from "./app.module";
var AppComponent = (function () {
    function AppComponent(todoService, authService, errorH) {
        this.hide = true;
        this.errorH = errorH;
        this.todoService = todoService;
        this.authService = authService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiObj = this.todoService.jsonify(this.todoService.getLocalStorage(this.todoService.lSName[4]));
        if (typeof this.apiObj === 'object') {
            this.logInBtn = "Logged as: " + this.apiObj.email;
            this.todoService.getData(this.apiObj.uid)
                .then(function (res) { _this.appCmpntInit(_this.todoService.appInit(res.val())); })
                .then(function (res) {
                _this.isChecked = _this.todoService.matchAllAndDone(_this.todoService.listItems);
                _this.quantityTodos = _this.todoService.listItems.length;
                _this.todos = _this.todoService.listItems;
            })
                .catch(function (error) { return _this.errorH.handleError(error); });
        }
        else {
            // No user is signed in. TODO
            this.guestInit();
        }
        FB.auth().onAuthStateChanged(function (user) {
            if (user) {
                // If any user is signed in.
                _this.userId = user.uid;
                _this.loggedInUserEmail = user.email;
                _this.logInBtn = "Logged as: " + _this.loggedInUserEmail;
                _this.todoService.getData(_this.userId)
                    .then(function (res) {
                    _this.appCmpntInit(_this.todoService.appInit(res.val()));
                })
                    .then(function (res) {
                    _this.isChecked = _this.todoService.matchAllAndDone(_this.todoService.listItems);
                    _this.quantityTodos = _this.todoService.listItems.length;
                    _this.todos = _this.todoService.listItems;
                })
                    .catch(function (error) { return _this.errorH.handleError(error); });
            }
            else {
                // No user is signed in. TODO
                _this.guestInit();
            }
        }, (function (error) { return _this.errorH.handleError(error); }));
    };
    AppComponent.prototype.guestInit = function () {
        this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1]));
        this.logInBtn = 'Log In or Register';
        this.todos = this.todoService.listItems;
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
    AppComponent.prototype.checkAllFunc = function (state, userId) {
        this.checkAll = state;
        this.todoService.highlightTodo(this.todoService.listItems, this.checkAll);
        this.todoService.setLocalStorage(this.todoService.listItems, userId);
        this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
    };
    AppComponent.prototype.onSubmit = function (val, userId) {
        if (this.todoService.inputValidation(val)) {
            this.todoService.addItem(val);
            this.isHidden = true;
            this.hide = false;
            this.todoService.setLocalStorage(this.todoService.listItems, userId);
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
        template: "<section class=\"wrapper\">\n        <div class=\"todos\">\n            <h1 class=\"todos__header\">To Do List</h1>\n            <div id=\"todos__body-id\" class=\"todos__body rel__item\">\n                <input type=\"text\" #name (keyup.enter)=\"onSubmit(name.value, this.userId); name.value='';\" id=\"addItemInput\" class=\"todos__item\" placeholder=\"Add a to-do...\" [autofocus]=\"'true'\">\n                <input type=\"checkbox\" (click)=\"checkAllFunc(mainCheckBox.checked, this.userId)\" [checked]=\"isChecked\" #mainCheckBox [class.hidden]=\"this.isHidden\"  class=\"todos__checkbox todos__checkbox_main\" title=\"Active / Done\">\n                    <all-todos [class.hide]=\"this.hide\"></all-todos>\n                <span [class.hide]=\"hide\" class=\"filters__count\">Total tasks: {{quantityTodos}}</span>\n            </div>\n            <div [class.hide]=\"hide\" class=\"rules\" >Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>\n        </div>\n        <cap [style.display]=\"itemVisibility ? 'block' : 'none'\"></cap>\n        <m-w-del-all-done class=\"animated__long\" [style.display]=\"itemVisibility ? 'block' : 'none'\"></m-w-del-all-done>\n        <auth-wndw></auth-wndw>\n        <button md-button></button>\n    </section>",
        providers: []
    }),
    __param(0, Inject(TodosService)),
    __param(1, Inject(AuthService)),
    __param(2, Inject(ErrorHandlerService)),
    __metadata("design:paramtypes", [TodosService,
        AuthService,
        ErrorHandlerService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=AppComponent.js.map
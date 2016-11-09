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
import { Injectable, Inject } from '@angular/core';
import { ErrorHandlerService } from "../error.handler.service/error.handler.service";
var TodosService = (function () {
    function TodosService(errorH) {
        this.inputFieldHeight = '75px';
        this.errorH = errorH;
    }
    TodosService.prototype.getData = function () {
        return localStorage.getItem("todos");
    };
    TodosService.prototype.setLocalStorage = function (arr) {
        localStorage.setItem("todos", JSON.stringify(arr));
    };
    TodosService.prototype.appInit = function () {
        this.savedObj = JSON.parse(this.getData());
        if (typeof (this.savedObj) === 'object' && this.savedObj !== null && this.savedObj.length > 0) {
            this.listItems = this.savedObj;
            (this.listItems.length) ? this.id = this.listItems[this.listItems.length - 1].id + 1 : this.id = 0;
            return true;
        }
        else {
            this.listItems = [];
            this.id = 0;
            return false;
        }
    };
    TodosService.prototype.counter = function () {
        return this.id++;
    };
    TodosService.prototype.addItem = function (val) {
        var todo = { id: this.counter(), value: val, done: false };
        this.listItems.push(todo);
    };
    TodosService.prototype.rmItem = function (index, states) {
        var isChecked = states[0], hide = states[1], isHidden = states[2];
        this.removeTodo(this.listItems, index);
        this.setLocalStorage(this.listItems);
        isChecked = this.matchAllAndDone(this.listItems);
        if (this.listItems.length === 0) {
            hide = true;
            isHidden = false;
        }
        ;
        return [isChecked, hide, isHidden];
    };
    TodosService.prototype.checkItem = function (state, id, states) {
        var isChecked = state[0];
        this.highlightTodo(this.listItems, state, id);
        this.setLocalStorage(this.listItems);
        return [this.matchAllAndDone(this.listItems)];
    };
    TodosService.prototype.inputValidation = function (value) {
        return (typeof value === 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
    };
    TodosService.prototype.highlightTodo = function (arr, state, id) {
        if (id === void 0) { id = null; }
        var i;
        if (id || id === 0) {
            arr[id].done = state;
        }
        else {
            for (i = 0; i < arr.length; i++) {
                arr[i].done = state;
            }
        }
    };
    TodosService.prototype.edit = function (el, index, value) {
        if (this.inputValidation(value)) {
            this.saveEditedItem(this.listItems, index, value);
            this.setLocalStorage(this.listItems);
            this.hideEl(el);
        }
    };
    TodosService.prototype.removeTodo = function (arr, id) {
        if (id === void 0) { id = null; }
        if (id || id === 0)
            arr.splice(id, 1);
    };
    TodosService.prototype.deleteAll = function (arr) {
        var i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].done === true) {
                arr.splice(i, 1);
            }
            ;
            if (arr[i] && arr[i].done === true) {
                this.deleteAll(arr);
            }
            ;
        }
        return arr;
    };
    TodosService.prototype.matchAllAndDone = function (arr) {
        var i, t = 0, l = arr.length;
        if (l === 0)
            return false;
        for (i = 0; i < l; i++) {
            if (arr[i].done === true) {
                t++;
            }
            ;
        }
        return (t == l) ? true : false;
    };
    TodosService.prototype.saveEditedItem = function (arr, id, val) {
        arr[id].value = val;
    };
    TodosService.prototype.openCloseEditable = function (ev, todoState) {
        if (todoState === void 0) { todoState = false; }
        if (todoState === false) {
            if (ev.target.children[2]) {
                if (window.getComputedStyle(ev.target.children[2], null).getPropertyValue("height") === '0px') {
                    ev.target.children[2].style.height = this.inputFieldHeight;
                }
                else {
                    ev.target.children[2].style.height = '0';
                }
            }
        }
    };
    TodosService.prototype.hideEl = function (el) {
        el.parentNode.style.height = 0;
    };
    return TodosService;
}());
TodosService = __decorate([
    Injectable(),
    __param(0, Inject(ErrorHandlerService)),
    __metadata("design:paramtypes", [ErrorHandlerService])
], TodosService);
export { TodosService };
//# sourceMappingURL=todos.service.js.map
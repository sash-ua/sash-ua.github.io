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
import { Observable } from "rxjs/Observable";
import { ErrorHandlerService } from "../error.handler.service/error.handler.service";
var TodosService = (function () {
    function TodosService(errorH) {
        this.inputFieldHeight = '75px';
        this.errorH = errorH;
    }
    TodosService.prototype.getData = function () {
        return localStorage.getItem("todos");
    };
    TodosService.prototype.setObservable = function (data) {
        return Observable.create(function (observer) {
            observer.next(data);
        });
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
    TodosService.prototype.editTodo = function (arr, id, val) {
        arr[id].value = val;
    };
    TodosService.prototype.openEl = function (ev, todoState) {
        if (todoState === void 0) { todoState = false; }
        if (todoState === false) {
            if (ev.target.children[2]) {
                ev.target.children[2].style.height = this.inputFieldHeight;
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
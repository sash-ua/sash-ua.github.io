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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { firebaseConfig, FB } from "../../app.module";
var TodosService = (function () {
    function TodosService(errorH) {
        this.lSName = ['todos', 'guest_todos', 'true', 'userId', "firebase:authUser:" + firebaseConfig.apiKey + ":[DEFAULT]"];
        this.inputFieldHeight = '75px';
        this.errorH = errorH;
    }
    TodosService.prototype.getData = function (userId) {
        return FB.database().ref('/' + userId).once('value');
    };
    TodosService.prototype.jsonify = function (data) {
        return (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? JSON.parse(data) : new Error('jsonify Error');
    };
    TodosService.prototype.getLocalStorage = function (key) {
        return localStorage.getItem(key);
    };
    TodosService.prototype.setLocalStorage = function (arr, userId) {
        if (userId === void 0) { userId = ''; }
        var data = JSON.stringify(arr);
        if (userId) {
            localStorage.setItem(this.lSName[0], data);
            FB.database().ref('/' + userId).set(data);
        }
        else {
            localStorage.setItem(this.lSName[1], data);
        }
    };
    TodosService.prototype.clearLocalStorage = function (arrNames) {
        arrNames.forEach(function (el, idx, arr) {
            localStorage.removeItem(el);
        });
    };
    // Save to localStorage obj. Before it converts JS object to JSON obj.
    TodosService.prototype.saveToLS = function (data, guestFlag) {
        if (guestFlag === void 0) { guestFlag = this.lSName[0]; }
        localStorage.setItem(guestFlag, data);
    };
    // JS obj. validation
    TodosService.prototype.simpleJsonObjValid = function (data) {
        return (typeof (data) === 'object' && data !== null && data.length > 0) ? true : false;
    };
    // App init. Get JSON object, then the validity check with simpleJsonObjValid(), save to localStorage, init. this.listItems,
    // set id (index number of last to do item)
    TodosService.prototype.appInit = function (data, guestFlag) {
        this.savedObj = this.jsonify(data);
        if (this.simpleJsonObjValid(this.savedObj)) {
            this.saveToLS(this.jsonify(this.savedObj), guestFlag);
            this.listItems = this.savedObj;
            (this.listItems.length) ? this.id = this.listItems[this.listItems.length - 1].id + 1 : this.id = 0;
            return true;
        }
        else {
            this.listItems = [];
            this.saveToLS(this.jsonify(this.listItems));
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
    TodosService.prototype.rmItem = function (index, states, userId) {
        var isChecked = states[0], hide = states[1], isHidden = states[2], quantityTodos = states[3];
        this.removeTodo(this.listItems, index);
        this.setLocalStorage(this.listItems, userId);
        isChecked = this.matchAllAndDone(this.listItems);
        quantityTodos = this.listItems.length;
        if (this.listItems.length === 0) {
            hide = true;
            isHidden = false;
        }
        ;
        return [isChecked, hide, isHidden, quantityTodos];
    };
    TodosService.prototype.checkItem = function (state, id, states, userId) {
        var isChecked = state;
        this.highlightTodo(this.listItems, state, id);
        this.setLocalStorage(this.listItems, userId);
        return [this.matchAllAndDone(this.listItems)];
    };
    TodosService.prototype.inputValidation = function (value) {
        return (typeof value == 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
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
    TodosService.prototype.edit = function (el, index, value, userId) {
        if (this.inputValidation(value)) {
            this.saveEditedItem(this.listItems, index, value);
            this.setLocalStorage(this.listItems, userId);
            this.hideEl(el);
        }
    };
    TodosService.prototype.removeTodo = function (arr, id) {
        if (id === void 0) { id = null; }
        if (id || id === 0)
            arr.splice(id, 1);
    };
    TodosService.prototype.deleteAll = function (arr, state) {
        if (state === void 0) { state = true; }
        var i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].done === state) {
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
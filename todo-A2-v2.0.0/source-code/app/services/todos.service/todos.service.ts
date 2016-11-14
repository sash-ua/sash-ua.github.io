import {Injectable, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ErrorHandlerService} from "../error.handler.service/error.handler.service";
import {ListItem} from "../../todo/list.item";
import {database, auth} from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {firebaseConfig, FB} from "../../app.module";

@Injectable()
export class TodosService{
    lSName: string[] = ['todos', 'guest_todos', 'true', 'userId', `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`];
    private inputFieldHeight: string = '75px';
    private errorH: any;
    public listItems: ListItem[];
    private savedObj: ListItem[];
    private  id: number;

    constructor(
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ) {
        this.errorH = errorH;
    }
    getData(userId: string){
        return FB.database().ref('/' + userId).once('value');
    }
    jsonify(data: any){
        return (typeof data === 'object') ? JSON.stringify(data) : (typeof data === 'string') ? JSON.parse(data) : new Error('jsonify Error');
    }
    getLocalStorage(key: string) {
            return localStorage.getItem(key);
    }
    setLocalStorage(arr: ListItem[], userId?: string = ''){
        let data = JSON.stringify(arr);
        if(userId){
            localStorage.setItem(this.lSName[0], data);
            FB.database().ref('/' + userId).set(data);
        } else {
            localStorage.setItem(this.lSName[1], data);
        }
    }
    clearLocalStorage(arrNames: string[]){
        arrNames.forEach((el, idx, arr) => {
            localStorage.removeItem(el);
        });

    }
    // Save to localStorage obj. Before it converts JS object to JSON obj.
    saveToLS(data: string, guestFlag?: string = this.lSName[0]){
        localStorage.setItem(guestFlag, data);
    }
    // JS obj. validation
    simpleJsonObjValid(data: any): boolean{
        return (typeof (data) === 'object' && data !== null && data.length > 0) ? true : false;
    }
    // App init. Get JSON object, then the validity check with simpleJsonObjValid(), save to localStorage, init. this.listItems,
    // set id (index number of last to do item)
    appInit(data: string, guestFlag?: string ){
        this.savedObj = this.jsonify(data);
        if(this.simpleJsonObjValid(this.savedObj)){
            this.saveToLS(this.jsonify(this.savedObj), guestFlag);
            this.listItems = this.savedObj;
            (this.listItems.length) ? this.id = this.listItems[this.listItems.length-1].id + 1 : this.id = 0;
            return true;
        } else {
            this.listItems = [];
            this.saveToLS(this.jsonify(this.listItems));
            this.id = 0;
            return false;
        }
    }
    counter(){
        return this.id++;
    }
    addItem(val:any){
        let todo: ListItem = {id: this.counter(), value: val, done: false};
        this.listItems.push(todo);
    }
    rmItem(index: number, states: Array<boolean>, userId?: string){
        let [isChecked, hide, isHidden, quantityTodos] = states;
        this.removeTodo(this.listItems, index);
        this.setLocalStorage(this.listItems, userId);
        isChecked = this.matchAllAndDone(this.listItems);
        quantityTodos = this.listItems.length;
        if(this.listItems.length === 0) {
            hide = true;
            isHidden = false;
        };
        return [isChecked, hide, isHidden, quantityTodos];
    }
    checkItem(state: boolean, id: number, states: Array<boolean>, userId?: string){
        let isChecked = state;
        this.highlightTodo(this.listItems, state, id);
        this.setLocalStorage(this.listItems, userId);
        return [this.matchAllAndDone(this.listItems)];
    }
    inputValidation(value: string): boolean {
        return (typeof value == 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
    }
    highlightTodo(arr: ListItem[], state: boolean, id: number = null){
        let i: number;
        if(id || id === 0){
            arr[id].done = state;
        } else {
            for(i = 0; i < arr.length; i++){
                arr[i].done = state;
            }
        }
    }
    edit(el: HTMLElement, index: number, value: string, userId?: string){
        if(this.inputValidation(value)){
            this.saveEditedItem(this.listItems, index, value);
            this.setLocalStorage(this.listItems, userId);
            this.hideEl(el);
        }
    }
    removeTodo(arr: ListItem[], id: number = null){
        if(id || id === 0) arr.splice(id, 1);
    }
    deleteAll(arr: ListItem[], state?: boolean = true){
        let i: number;
        for(i = 0; i < arr.length; i++){
            if(arr[i].done === state) {arr.splice(i, 1)};
            if(arr[i] && arr[i].done === true) {this.deleteAll(arr)};
        }
        return arr;
    }
    matchAllAndDone(arr: ListItem[]){
        let i: number,
            t: number = 0,
            l: number = arr.length;
        if(l === 0) return false;
        for(i = 0; i < l; i++){
            if(arr[i].done === true) {t++};
        }
        return (t == l) ? true : false;
    }
    saveEditedItem(arr: ListItem[], id: number, val: string){
        arr[id].value = val;
    }
    openCloseEditable(ev: Event, todoState: boolean = false){
        if(todoState === false) {
            if (ev.target.children[2]) {
                if(window.getComputedStyle(ev.target.children[2],null).getPropertyValue("height") === '0px'){
                    ev.target.children[2].style.height = this.inputFieldHeight;
                }else {
                    ev.target.children[2].style.height = '0';
                }
            }
        }
    }
    hideEl(el: HTMLElement){
        el.parentNode.style.height = 0;
    }
}
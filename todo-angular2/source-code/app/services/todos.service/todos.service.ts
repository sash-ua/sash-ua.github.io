import {Injectable, Inject} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ErrorHandlerService} from "../error.handler.service/error.handler.service";
import {ListItem} from "../../todo/list.item";

@Injectable()
export class TodosService {
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
    getData(){
        return localStorage.getItem("todos");
    }
    setLocalStorage(arr: ListItem[]){
        localStorage.setItem("todos", JSON.stringify(arr));
    }
    appInit(){
        this.savedObj = JSON.parse(this.getData());
        if(typeof (this.savedObj) === 'object' && this.savedObj !== null && this.savedObj.length > 0){
            this.listItems = this.savedObj;
            (this.listItems.length) ? this.id = this.listItems[this.listItems.length-1].id + 1 : this.id = 0;
            return true;
        } else {
            this.listItems = [];
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
    rmItem(index: number, states: Array<boolean>){
        let [isChecked, hide, isHidden] = states;
        this.removeTodo(this.listItems, index);
        this.setLocalStorage(this.listItems);
        isChecked = this.matchAllAndDone(this.listItems);
        if(this.listItems.length === 0) {
            hide = true;
            isHidden = false;
        };
        return [isChecked, hide, isHidden];
    }
    checkItem(state: boolean, id: number, states: Array<boolean>){
        let [isChecked] = state;
        this.highlightTodo(this.listItems, state, id);
        this.setLocalStorage(this.listItems);
        return [this.matchAllAndDone(this.listItems)];
    }
    inputValidation(value: string): boolean {
        return (typeof value === 'string') ? value.replace(/(\s)+/g, '').length > 0 : false;
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
    edit(el: HTMLElement, index: number, value: string){
        if(this.inputValidation(value)){
            this.saveEditedItem(this.listItems, index, value);
            this.setLocalStorage(this.listItems);
            this.hideEl(el);
        }
    }
    removeTodo(arr: ListItem[], id: number = null){
        if(id || id === 0) arr.splice(id, 1);
    }
    deleteAll(arr: ListItem[]){
        let i: number;
        for(i = 0; i < arr.length; i++){
            if(arr[i].done === true) {arr.splice(i, 1)};
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
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
    setObservable(data: any){
        return Observable.create((observer: any) => {
            observer.next(data);
        });
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
    editTodo(arr: ListItem[], id: number, val: string){
        arr[id].value = val;
    }
    openEl(ev: Event, todoState: boolean = false){
        if(todoState === false) {
            if (ev.target.children[2]) {
                ev.target.children[2].style.height = this.inputFieldHeight;
            }
        }
    }
    hideEl(el: HTMLElement){
        el.parentNode.style.height = 0;
    }
}
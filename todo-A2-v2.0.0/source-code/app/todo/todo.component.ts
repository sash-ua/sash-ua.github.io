import {Component, OnInit, Inject, Input, trigger, state, style, transition, animate} from '@angular/core';
import {TodosService} from "../services/todos.service/todos.service";
import {AppComponent} from "../AppComponent";
import {ListItem} from "./list.item";
import {ErrorHandlerService} from "../services/error.handler.service/error.handler.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'all-todos',
    template:
    `<li (click)="open($event, todo.done)" *ngFor="let todo of this.allTodo.todos; let idx = index; trackBy: trackByTodo;" 
             [class.hide_todo]="filter ? filterId ? false : todo.done : !todo.done"  class="todos__item animated__long">{{todo.value}}
        <input  [(ngModel)]="todo.done" (change)="checkTodo(!todo.done, idx, this.allTodo.userId)" type='checkbox' class='todos__checkbox todos__checkbox_sub'>
        <button (click)="rmTodo(idx, this.allTodo.userId, $event.target)"  class='todos__checkbox todos__checkbox_del animated>'></button>
        <div class='todos__edit_item animated__long'>
            <input (keyup.enter)="edit(inputTodo, idx, inputTodo.value, this.allTodo.userId);" (keyup.escape)="escape(inputTodo)" #inputTodo [value]="todo.value" type='text' class='todos__edit' autofocus>
        </div>
    </li>
    <ul class="filters__nav">
        <li class="filters__item"><a md-raised-button (click)="filter = true; filterId = true; hightlightFilter($event.target);" class="filters__link animated act">All</a></li>
        <li class="filters__item"><a md-raised-button (click)="filter = true; filterId = false; hightlightFilter($event.target);" class="filters__link animated">Active</a></li>
        <li class="filters__item"><a md-raised-button (click)="filter = false; hightlightFilter($event.target);" class="filters__link animated">Completed</a></li>
        <li class="filters__item"><a md-raised-button (click)="this.allTodo.itemVisibility ? this.allTodo.itemVisibility = false : this.allTodo.itemVisibility = true" type="submit"  class=" filters__link animated">Del. Completed</a></li>
    </ul>`,
    providers: []
})
export class TodoComponent implements OnInit  {
    private todo: any;
    itemVisibility: boolean;
    private todoService: any;
    private allTodo: any;
    private errorH:any;
    private filter = true;
    private filterId = true;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(AppComponent) listItems: AppComponent,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ) {
        this.allTodo = listItems;
        this.todoService = todoService;
    }
    ngOnInit() {}

    trackByTodo(index: number, todo: ListItem){
        return todo.id;
    }
    hightlightFilter(targetEl: any){
        document.querySelectorAll('.filters__link').forEach((el, idx, arr) => {
            el.classList.remove('act');
        });
        targetEl.classList.add('act');
    }
    checkTodo(state: boolean, id: number, userId?: string){
        let states = [this.allTodo.isChecked];
        [this.allTodo.isChecked] = this.todoService.checkItem(state, id, states, userId);
    }
    rmTodo(index: number, userId?: string, el?: HTMLElement){
        let states = [this.allTodo.isChecked, this.allTodo.hide, this.allTodo.isHidden];
        el.parentNode.style.opacity = '0';
        el.parentNode.style.marginLeft = '100%';
        setTimeout(() => {
            [this.allTodo.isChecked, this.allTodo.hide, this.allTodo.isHidden, this.allTodo.quantityTodos] = this.todoService.rmItem(index, states, userId);
        },500)
    }
    edit(el: HTMLElement, index: number, value: string, userId?: string){
        this.todoService.edit(el, index, value, userId);
    }
    open(ev: Event, todoState: boolean){
        this.todoService.openCloseEditable(ev, todoState);
    }
    escape(el: HTMLElement){
        this.todoService.hideEl(el);
    }
}
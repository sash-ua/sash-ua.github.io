import {Component, OnInit, Inject} from '@angular/core';
import {TodosService} from "../services/todos.service/todos.service";
import {AppComponent} from "../AppComponent";
import {ListItem} from "./list.item";

@Component({
    template: `<li (click)="open($event, todo.done)" *ngFor="let todo of todos; let idx = index; trackBy: trackByTodo; " class="todos__item">{{todo.value}}
                    <input  [(ngModel)]="todo.done" (change)="checkTodo(!todo.done, idx)" type='checkbox' class='todos__checkbox todos__checkbox_sub'>
                    <button (click)="rmTodo(idx)" class='todos__checkbox todos__checkbox_del animated>'></button>
                    <div class='todos__edit_item animated__long' title='Double-click to edit a Todo' >
                        <input (keyup.enter)="edit(inputTodo, idx, inputTodo.value);" (keyup.escape)="escape(inputTodo)" #inputTodo [value]="todo.value" type='text' class='todos__edit' autofocus>
                    </div>
                </li>`,
    providers: []
})
export class TodoComponent implements OnInit  {
    private todos: any;
    private todoService: any;
    private allTodo: any;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(AppComponent) listItems: AppComponent
    ) {
        this.allTodo = listItems;
        this.todoService = todoService;
    }
    ngOnInit() {
        this.todos = this.todoService.listItems;
    }
    trackByTodo(index: number, todo: ListItem){
        return todo.id;
    }
    checkTodo(state: boolean, id: number){
        this.todoService.highlightTodo(this.todoService.listItems, state, id);
        this.todoService.setLocalStorage(this.todoService.listItems);
        this.allTodo.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
    }
    rmTodo(index: number){
        this.todoService.removeTodo(this.todoService.listItems, index);
        this.todoService.setLocalStorage(this.todoService.listItems);
        this.allTodo.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
        this.allTodo.quantityTodos = this.todoService.listItems.length;
        if(this.allTodo.quantityTodos === 0) {
            this.allTodo.hide = true;
            this.allTodo.isHidden = false;
        };
    }
    edit(el: HTMLElement, index: number, value: string){
        if(this.todoService.inputValidation(value)){
            this.todoService.editTodo(this.todoService.listItems, index, value);
            this.todoService.setLocalStorage(this.todoService.listItems);
            this.todoService.hideEl(el);
        }
    }
    open(ev: Event, todoState: boolean){
            this.todoService.openEl(ev, todoState);
    }
    escape(el: HTMLElement){
        this.todoService.hideEl(el);
    }

}
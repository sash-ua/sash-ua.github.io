
import {Component, OnInit, Inject} from '@angular/core';
import {TodosService} from "../services/todos.service/todos.service";
import {AppComponent} from "../AppComponent";
import {ListItem} from "../todo.item/list.item";


@Component({
    template: `<li (click)="open($event);" *ngFor="let todo of todos; let idx = index; trackBy: trackByTodo" [class.hidden]="!todo.done" class="todos__item">{{todo.value}}{{isActive}}
                    <input  [(ngModel)]="todo.done" (change)="checkTodo(!todo.done, idx)" type='checkbox' class='todos__checkbox todos__checkbox_sub'>
                    <button (click)="rmTodo(idx)" class='todos__checkbox todos__checkbox_del animated>'></button>
                    <div class='todos__edit_item animated__long' title='Double-click to edit a Todo' >
                        <input (keyup.enter)="edit(input, idx, input.value);" (keyup.escape)="escape(input);" #input [value]="todo.value" type='text' class='todos__edit' autofocus>
                    </div>
                </li>`
})
export class ComplitedFilterComponent implements OnInit {
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
        this.todos = this.allTodo.listItems;
    }
    trackByTodo(index: number, todo: ListItem){
        return todo.id;
    }
    checkTodo(state: boolean, id: number){
        this.todoService.highlightTodo(this.allTodo.listItems, state, id);
        this.todoService.setLocalStorage(this.allTodo.listItems);
        this.allTodo.isChecked = this.todoService.matchAllAndDone(this.allTodo.listItems);
    }
    rmTodo(index: number){
        this.todoService.removeTodo(this.allTodo.listItems, index);
        this.todoService.setLocalStorage(this.allTodo.listItems);
        this.allTodo.isChecked = this.todoService.matchAllAndDone(this.allTodo.listItems);
        this.allTodo.quantityTodos = this.allTodo.listItems.length;
    }
    edit(el: HTMLElement, index: number, value: string){
        if(this.todoService.inputValidation(value)){
            this.todoService.editTodo(this.allTodo.listItems, index, value);
            this.todoService.setLocalStorage(this.allTodo.listItems);
            this.todoService.hideEl(el);
        }
    }
    open(ev: Event){
        this.todoService.openEl(ev);
    }
    escape(el: HTMLElement){
        this.todoService.hideEl(el);
    }
}
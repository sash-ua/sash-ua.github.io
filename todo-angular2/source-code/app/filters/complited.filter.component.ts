
import {Component, OnInit, Inject} from '@angular/core';
import {TodosService} from "../services/todos.service/todos.service";
import {AppComponent} from "../AppComponent";
import {ListItem} from "../todo/list.item";
import {TodoComponent} from "../todo/todo.component";


@Component({
    template: `<li *ngFor="let todo of todos; let idx = index; trackBy: trackByTodo" [class.hidden]="!todo.done" class="todos__item">{{todo.value}}
                    <input  [(ngModel)]="todo.done" (change)="checkTodo(!todo.done, idx)" type='checkbox' class='todos__checkbox todos__checkbox_sub'>
                    <button (click)="rmTodo(idx)" class='todos__checkbox todos__checkbox_del animated>'></button>
                </li>`,
    providers: [TodoComponent]
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
        this.todos = this.todoService.listItems;
    }
    trackByTodo(index: number, todo: ListItem){
        return todo.id;
    }
    checkTodo(state: boolean, id: number){
        let states = [this.allTodo.isChecked];
        [this.allTodo.isChecked] = this.todoService.checkItem(state, id, states);
    }
    rmTodo(index: number){
        let states = [this.allTodo.isChecked, this.allTodo.hide, this.allTodo.isHidden];
        [this.allTodo.isChecked, this.allTodo.hide, this.allTodo.isHidden] = this.todoService.rmItem(index, states);
    }
}
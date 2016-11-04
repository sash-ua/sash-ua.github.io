
import {Component, OnInit, Inject} from '@angular/core';
import {ListItem} from "./todo.item/list.item";
import {TodosService} from "./services/todos.service/todos.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    template:
    `<section class="wrapper">
        <div class="todos">
            <h1 class="todos__header">To Do List</h1>
            <div id="todos__body-id" class="todos__body rel__item">
                <input type="text" #name (keyup.enter)="onSubmit(name.value); name.value=''; $event.stopPropagation();" class="todos__item" placeholder="Add a to-do..." [autofocus]="'true'">
                <input type="checkbox" (click)="checkAllFunc(mainCheckBox.checked)" [checked]="isChecked" #mainCheckBox [class.hidden]="isHidden"  class="todos__checkbox todos__checkbox_main">
                    <filters></filters>
                <span class="filters__count">Total to do: {{quantityTodos}}</span>
            </div>
            <div class="rules">Double-click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>
        </div>
    </section>`,
    providers: []
})

export class AppComponent implements OnInit{
    isHidden: boolean;
    checkAll:boolean;
    isChecked:boolean;
    quantityTodos: number;
    private  id: number;
    protected listItems: any[];
    private errorH:any;
    private todoService: any;
    private savedObj: Object;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ){
        this.errorH = errorH;
        this.todoService = todoService;
    }
    ngOnInit() {
        this.todoInit();
        this.isChecked = this.todoService.matchAllAndDone(this.listItems);
        this.quantityTodos = this.listItems.length;
    }
    todoInit(){
        this.savedObj = JSON.parse(this.todoService.getData());
        if(typeof (this.savedObj) === 'object' && this.savedObj !== null){
            this.listItems = this.savedObj;
            this.isHidden = true;
            (this.listItems.length) ? this.id = this.listItems[this.listItems.length-1].id + 1 : this.id = 0;
        } else {
            this.isHidden = false;
            this.listItems = [];
            this.id = 0;
        }
    }
    counter(){
        return this.id++;
    }
    checkAllFunc (state: boolean){
        this.checkAll = state;
        this.todoService.highlightTodo(this.listItems, this.checkAll);
        this.todoService.setLocalStorage(this.listItems);
        this.isChecked = this.todoService.matchAllAndDone(this.listItems);
    }
    onSubmit(val:any){
        if(this.todoService.inputValidation(val)) {
            this.isHidden = true;
            let todo: ListItem = {id: this.counter(), value: val, done: false};
            this.listItems.push(todo);
            this.todoService.setLocalStorage(this.listItems);
            this.isChecked = this.todoService.matchAllAndDone(this.listItems);
            this.quantityTodos = this.listItems.length;
        }
    }
}
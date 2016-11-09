
import {Component, OnInit, Inject} from '@angular/core';
import {ListItem} from "./todo/list.item";
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
                <input type="checkbox" (click)="checkAllFunc(mainCheckBox.checked)" [checked]="isChecked" #mainCheckBox [class.hidden]="isHidden"  class="todos__checkbox todos__checkbox_main" title="Active / Done">
                <filters [class.hide]="hide"></filters>
                <span [class.hide]="hide" class="filters__count">Total tasks: {{quantityTodos}}</span>
            </div>
            <div [class.hide]="hide" class="rules" >Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>
        </div>
        <button md-button></button>
    </section>`,
    providers: []
})

export class AppComponent implements OnInit{
    appState: boolean;
    isHidden: boolean;
    hide: boolean;
    checkAll:boolean;
    isChecked:boolean;
    quantityTodos: number;
    private errorH:any;
    private todoService: any;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ){
        this.errorH = errorH;
        this.todoService = todoService;
    }
    ngOnInit() {
        this.appState = this.todoService.appInit();
        this.appCmpntInit(this.appState);
        this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
        this.quantityTodos = this.todoService.listItems.length;
    }
    appCmpntInit(state: boolean){
        if(state){
            this.isHidden = true;
            this.hide = false;
        } else {
            this.isHidden = false;
            this.hide = true;
        }
    }
    checkAllFunc (state: boolean){
        this.checkAll = state;
        this.todoService.highlightTodo(this.todoService.listItems, this.checkAll);
        this.todoService.setLocalStorage(this.todoService.listItems);
        this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
    }
    onSubmit(val:any){
        if(this.todoService.inputValidation(val)) {
            this.todoService.addItem(val);
            this.isHidden = true;
            this.hide = false;
            this.todoService.setLocalStorage(this.todoService.listItems);
            this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
            this.quantityTodos = this.todoService.listItems.length;
        }
    }
}
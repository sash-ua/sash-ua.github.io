
import {Component, OnInit, Inject} from '@angular/core';
import {TodosService} from "./services/todos.service/todos.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";
import {AuthService} from "./services/auth/auth.service";
import {database, auth} from 'firebase';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {FB} from "./app.module";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    template:
    `<section class="wrapper">
        <div class="todos">
            <h1 class="todos__header">To Do List</h1>
            <div id="todos__body-id" class="todos__body rel__item">
                <input type="text" #name (keyup.enter)="onSubmit(name.value, this.userId); name.value='';" id="addItemInput" class="todos__item" placeholder="Add a to-do..." [autofocus]="'true'">
                <input type="checkbox" (click)="checkAllFunc(mainCheckBox.checked, this.userId)" [checked]="isChecked" #mainCheckBox [class.hidden]="this.isHidden"  class="todos__checkbox todos__checkbox_main" title="Active / Done">
                    <all-todos [class.hide]="this.hide"></all-todos>
                <span [class.hide]="hide" class="filters__count">Total tasks: {{quantityTodos}}</span>
            </div>
            <div [class.hide]="hide" class="rules" >Click to edit a Todo, Enter - to confirm changes, Esc - to leave editing!</div>
        </div>
        <cap [style.display]="itemVisibility ? 'block' : 'none'"></cap>
        <m-w-del-all-done class="animated__long" [style.display]="itemVisibility ? 'block' : 'none'"></m-w-del-all-done>
        <auth-wndw></auth-wndw>
        <button md-button></button>
    </section>`,
    providers: []
})

export class AppComponent implements OnInit{
    logInBtn: string;
    isHidden: boolean;
    hide: boolean = true;
    checkAll:boolean;
    isChecked:boolean;
    itemVisibility: boolean;
    quantityTodos: number;
    todos: Object;
    userId: string;
    private loggedInUserEmail: string;
    private errorH:ErrorHandlerService;
    private todoService: TodosService;
    private authService: AuthService;
    private apiObj: Object;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(AuthService) authService: AuthService,
        @Inject(ErrorHandlerService) errorH: ErrorHandlerService
    ){
        this.errorH = errorH;
        this.todoService = todoService;
        this.authService = authService;
    }
    ngOnInit() {
        this.apiObj = this.todoService.jsonify(this.todoService.getLocalStorage(this.todoService.lSName[4]));
        if(typeof this.apiObj === 'object'){
            this.logInBtn = `Logged as: ${this.apiObj.email}`;
            this.todoService.getData(this.apiObj.uid)
                .then((res: any) => { this.appCmpntInit( this.todoService.appInit(res.val()))})
                .then((res: any) => {
                    this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
                    this.quantityTodos = this.todoService.listItems.length;
                    this.todos = this.todoService.listItems;
                })
                .catch((error: Error) => this.errorH.handleError(error));
        } else {
            // No user is signed in. TODO
            this.guestInit();
        }
        FB.auth().onAuthStateChanged((user: any) => {
                if (user) {
                    // If any user is signed in.
                    this.userId = user.uid;
                    this.loggedInUserEmail = user.email;
                    this.logInBtn = `Logged as: ${this.loggedInUserEmail}`;
                    this.todoService.getData(this.userId)
                        .then((res: any) => {
                            this.appCmpntInit( this.todoService.appInit(res.val()));
                        })
                        .then((res: any) => {
                            this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
                            this.quantityTodos = this.todoService.listItems.length;
                            this.todos = this.todoService.listItems;
                        })
                        .catch((error: Error) => this.errorH.handleError(error));
                } else {
                    // No user is signed in. TODO
                    this.guestInit();
                }
            },
            ((error: any) => this.errorH.handleError(error)))
    }
    guestInit(){
        this.appCmpntInit(this.todoService.appInit(this.todoService.getLocalStorage(this.todoService.lSName[1]), this.todoService.lSName[1]));
        this.logInBtn = 'Log In or Register';
        this.todos = this.todoService.listItems;
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
    checkAllFunc (state: boolean, userId?: string){
        this.checkAll = state;
        this.todoService.highlightTodo(this.todoService.listItems, this.checkAll);
        this.todoService.setLocalStorage(this.todoService.listItems, userId);
        this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
    }
    onSubmit(val:any, userId?: string){
        if(this.todoService.inputValidation(val)) {
            this.todoService.addItem(val);
            this.isHidden = true;
            this.hide = false;
            this.todoService.setLocalStorage(this.todoService.listItems, userId);
            this.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
            this.quantityTodos = this.todoService.listItems.length;
        }
    }
}
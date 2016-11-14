import {Component, OnInit, Inject, Input} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import {TodosService} from "../../services/todos.service/todos.service";
import {AppComponent} from "../../AppComponent";

@Component({
    selector: 'm-w-del-all-done',
    template: `
    <div class="modal-window">
        <h2 class="modal-window__header">Are you wish to delete all completed tasks, really?</h2>
        <div class="modal-window__buttons">
            <input md-raised-button type="submit" (click)="this.allTodo.itemVisibility = false" (mouseenter)="cancelRed=true" (mouseleave)="cancelRed=false" [style.color]="cancelRed ? 'red' : '#000'" class="modal-window__btn filters__button filters__link animated" value="No">
            <input md-raised-button type="submit" (mouseenter)="delRed=true" (mouseleave)="delRed=false" [style.color]="delRed ? 'red' : '#000'" id="del-all-completed" class="modal-window__btn filters__button filters__link animated" value="Yes">
        </div>
    </div>`
})
export class ModalWindowComponent implements OnInit {
    private todoService: TodosService;
    private allTodo: AppComponent;
    private delRed: boolean;
    delCompleted: any;

    constructor(
        @Inject(TodosService) todoService: TodosService,
        @Inject(AppComponent) listItems: AppComponent
    ) {
        this.allTodo = listItems;
        this.todoService = todoService;
    }

    ngOnInit() {
        this.delCompleted = Observable.fromEvent(document.getElementById('del-all-completed'), 'click')
            .subscribe((x) => {
                this.todoService.setLocalStorage(this.todoService.deleteAll(this.todoService.listItems), this.allTodo.userId);
                this.allTodo.isChecked = this.todoService.matchAllAndDone(this.todoService.listItems);
                this.allTodo.quantityTodos = this.todoService.listItems.length;
                this.allTodo.itemVisibility = false;
                if(this.allTodo.quantityTodos === 0) {
                    this.allTodo.hide = true;
                    this.allTodo.isHidden = false;
                };
            });
    }
    @Input('data-itemVisibility') itemVisibility: boolean;
}
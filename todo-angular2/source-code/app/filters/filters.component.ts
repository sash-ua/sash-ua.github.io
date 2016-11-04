import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import {TodosService} from "../services/todos.service/todos.service";
import {AppComponent} from "../AppComponent";

@Component({
    selector: 'filters',
    template: `<ul class="list todos__list">
                    <router-outlet></router-outlet>
                </ul>
                <ul class="filters__nav">
                    <li class="filters__item"><a routerLink="all" routerLinkActive="active" class="filters__link animated">All</a></li>
                    <li class="filters__item"><a routerLink="active" routerLinkActive="active" class="filters__link animated">Active</a></li>
                    <li class="filters__item"><a routerLink="completed" routerLinkActive="active" class="filters__link animated">Completed</a></li>
                    <li class="filters__item"><input type="submit" (mouseenter)="delRed=true" (mouseleave)="delRed=false" [style.color]="delRed ? 'red' : '#fff'" id="del-all-completed" class="filters__button filters__link animated" value="Del. Completed"></li>
                </ul>`
})
export class FiltersComponent implements OnInit {
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
            this.todoService.setLocalStorage(this.todoService.deleteAll(this.allTodo.listItems));
            this.allTodo.isChecked = this.todoService.matchAllAndDone(this.allTodo.listItems);
            this.allTodo.quantityTodos = this.allTodo.listItems.length;
        });
    }
}
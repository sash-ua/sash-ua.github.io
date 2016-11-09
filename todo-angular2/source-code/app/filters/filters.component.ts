import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';
import {TodosService} from "../services/todos.service/todos.service";
import {AppComponent} from "../AppComponent";
import {MdButton, MdInput, MdToolbar, MdCard} from "@angular/material";


@Component({
    selector: 'filters',
    template: `<ul class="list todos__list">
                    <router-outlet></router-outlet>
                </ul>
                <ul class="filters__nav">
                    <li class="filters__item"><a md-raised-button color="primary" routerLink="all" routerLinkActive="active" class="filters__link animated">All</a></li>
                    <li class="filters__item"><a md-raised-button color="accent" routerLink="active" routerLinkActive="active" class="filters__link animated">Active</a></li>
                    <li class="filters__item"><a md-raised-button routerLink="completed" routerLinkActive="active" class="filters__link animated">Completed</a></li>
                    <li class="filters__item"><a md-raised-button (click)="itemVisibility ? itemVisibility = false : itemVisibility = true"  type="submit"  class=" filters__link animated">Del. Completed</a></li>
                </ul>
                <cap [style.display]="itemVisibility ? 'block' : 'none'"></cap>
                <m-w-del-all-done class="animated__long" [style.display]="itemVisibility ? 'block' : 'none'" ></m-w-del-all-done>`
})
export class FiltersComponent implements OnInit {
    itemVisibility: boolean;
    private todoService: TodosService;
    private allTodo: AppComponent;
    private delRed: boolean;
    delCompleted: any;

    constructor(@Inject(TodosService) todoService: TodosService,
                @Inject(AppComponent) listItems: AppComponent) {
        this.allTodo = listItems;
        this.todoService = todoService;
    }

    ngOnInit() {
    }
}
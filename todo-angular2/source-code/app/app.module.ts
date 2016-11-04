
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./AppComponent";
import {CoreModule} from "./core/core.module";
import {FiltersModule} from "./filters/filters.module";
import {TodoModule} from "./todo.item/todo.module";
import {Page404Component} from "./core/404.component/404.component";
import {TodosService} from "./services/todos.service/todos.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";
import {ListItem} from "./todo.item/list.item";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CoreModule,
        FiltersModule,
        TodoModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [TodosService, ErrorHandlerService, ListItem],
    bootstrap: [AppComponent],
})
export class AppModule {
}

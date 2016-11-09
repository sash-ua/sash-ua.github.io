
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import {AppComponent} from "./AppComponent";
import {CoreModule} from "./core/core.module";
import {FiltersModule} from "./filters/filters.module";
import {TodoModule} from "./todo/todo.module";
import {TodosService} from "./services/todos.service/todos.service";
import {ErrorHandlerService} from "./services/error.handler.service/error.handler.service";
import {ListItem} from "./todo/list.item";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CoreModule,
        FiltersModule,
        TodoModule,
        SharedModule,
        MaterialModule.forRoot()
    ],
    exports: [

    ],
    declarations: [
        AppComponent
    ],
    providers: [TodosService, ErrorHandlerService, ListItem],
    bootstrap: [AppComponent],
})
export class AppModule {
}

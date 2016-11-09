import{NgModule}from'@angular/core';
import {CommonModule} from "@angular/common";
import {TodoComponent} from "./todo.component";
import {FormsModule} from "@angular/forms";
import {TodosService} from "../services/todos.service/todos.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        TodoComponent
    ],
    declarations: [
        TodoComponent
    ],
    providers: [
        TodosService
    ],
})
export class TodoModule {
}

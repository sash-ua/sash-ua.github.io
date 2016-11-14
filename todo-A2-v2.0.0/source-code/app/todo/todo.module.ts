import{NgModule}from'@angular/core';
import {CommonModule} from "@angular/common";
import {TodoComponent} from "./todo.component";
import {FormsModule} from "@angular/forms";
import {TodosService} from "../services/todos.service/todos.service";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
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

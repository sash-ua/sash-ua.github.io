import { NgModule } from '@angular/core';
import {ComplitedFilterComponent} from "./complited.filter.component";
import {ActiveFilterComponent} from "./active.filter.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {FiltersComponent} from "./filters.component";
import {AppRoutingModule} from "../app_routing.module";
import {TodosService} from "../services/todos.service/todos.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule
    ],
    exports: [
        ActiveFilterComponent,
        ComplitedFilterComponent,
        FiltersComponent,
    ],
    declarations: [
        ActiveFilterComponent,
        ComplitedFilterComponent,
        FiltersComponent
    ],
    providers: [TodosService],
})
export class FiltersModule {}

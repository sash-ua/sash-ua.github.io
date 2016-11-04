
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {Page404Component} from "./core/404.component/404.component";
import {ActiveFilterComponent} from "./filters/active.filter.component";
import {ComplitedFilterComponent} from "./filters/complited.filter.component";
import {TodoComponent} from "./todo.item/todo.component";

const routes: Routes = [
    {path: '', redirectTo:'all', pathMatch: 'full'},
    {path: 'all', component: TodoComponent},
    {path: 'active', component: ActiveFilterComponent},
    {path: 'completed', component: ComplitedFilterComponent},
    {path: '**', component: Page404Component}
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
    providers: [],
})
export class AppRoutingModule {}

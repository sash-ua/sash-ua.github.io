
import{NgModule}from'@angular/core';
import {CommonModule}   from '@angular/common';
import {Page404Component} from "./404.component/404.component";
import {FormsModule} from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
    ],
    declarations: [
        Page404Component
    ],
    providers: [],
})
export class CoreModule {}

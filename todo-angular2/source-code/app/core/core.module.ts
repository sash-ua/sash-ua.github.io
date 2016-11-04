
import{NgModule}from'@angular/core';
import {CommonModule}   from '@angular/common';
import {Page404Component} from "./404.component/404.component";


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        Page404Component
    ],
    declarations: [
        Page404Component
    ],
    providers: [],
})
export class CoreModule {}

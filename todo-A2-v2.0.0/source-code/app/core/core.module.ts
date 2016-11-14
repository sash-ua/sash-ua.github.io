
import{NgModule}from'@angular/core';
import {CommonModule}   from '@angular/common';
import {AuthComponent} from "./auth.component/auth.component";
import {MaterialModule, MdButtonModule} from "@angular/material";
import {SharedModule} from "../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        SharedModule,
        MaterialModule.forRoot()
    ],
    exports: [
        AuthComponent
    ],
    declarations: [
        AuthComponent
    ],
    providers: [],
})
export class CoreModule {}

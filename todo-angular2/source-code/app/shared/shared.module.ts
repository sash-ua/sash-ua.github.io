
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalWindowComponent} from "./modalWindow/modal-window.component";
import {FormsModule} from "@angular/forms";
import {CapComponent} from "./cap.component/cap.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        ModalWindowComponent,
        CapComponent
    ],
    declarations: [
        ModalWindowComponent,
        CapComponent
    ],
    providers: [],
})
export class SharedModule {
}

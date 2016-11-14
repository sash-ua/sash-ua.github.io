
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ModalWindowComponent} from "./modalWindow/modal-window.component";
import {FormsModule} from "@angular/forms";
import {CapComponent} from "./cap.component/cap.component";
import {MWAlertComponent} from "./modalWindow/m-w-alert.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        ModalWindowComponent,
        CapComponent,
        MWAlertComponent
    ],
    declarations: [
        ModalWindowComponent,
        CapComponent,
        MWAlertComponent
    ],
    providers: [],
})
export class SharedModule {
}

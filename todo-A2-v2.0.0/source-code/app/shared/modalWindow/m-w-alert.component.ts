import {Component, OnInit, Input, trigger, state, style, transition, animate} from '@angular/core';

@Component({
    selector: 'm-w-alert',
    template: `
    <div [@openHide]="alerts"  class="modal-window modal-window_alerts">
        <h4 class="modal-window__header">{{this.message}}</h4>
    </div>`,
    animations: [
        trigger('openHide',[
            state('active', style({height: 'auto', opacity: 1, padding : '8px'})),
            state('inactive', style({height: '0%', opacity: 0, padding: 0})),
            transition('* <=> *', [
                animate(300)
            ])])
    ],
})
export class MWAlertComponent implements OnInit {

    constructor() { }
    ngOnInit() { }
    @Input('data-id') message: string;
    @Input('data-bind') alerts: string;
}
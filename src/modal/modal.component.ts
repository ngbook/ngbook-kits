import { Component, OnInit, Input,
    Output, EventEmitter
} from '@angular/core';
import {
    trigger, state, style,
    animate, transition, keyframes
} from '@angular/animations';

@Component({
    selector: 'ng-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    animations: [
        trigger('appear', [
            state('in', style({
                transform: 'translateY(0) scale(1)',
                opacity: 1
            })),
            transition(':enter', [
                animate('400ms ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(-70%) scale(0.2)', offset: 0}),
                    style({opacity: 0.5, transform: 'translateY(10%) scale(1.2)', offset: 0.3}),
                    style({opacity: 1, transform: 'translateY(0) scale(1)', offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                animate('200ms ease-in', keyframes([
                    style({opacity: 1, transform: 'translateY(0) scale(1)', offset: 0}),
                    style({opacity: 0, transform: 'scale(1.4)', offset: 1.0})
                ]))
            ]),
        ]),
    ]
})
export class NgModalComponent implements OnInit {
    @Input()
    public isOpen = false;
    @Output()
    public isOpenChange = new EventEmitter<boolean>();

    @Input()
    public overlayClosable = true;
    @Input()
    public boxStyle: any;

    constructor() { }

    public ngOnInit() {
    }
    public dismiss() {
        this.isOpen = false;
        this.isOpenChange.emit(false);
    }
    public overlayClicked() {
        if (this.overlayClosable) {
            this.dismiss();
        }
    }
    public stopBubble(event) {
        event.stopPropagation();
    }
}

import {
    Component, OnInit, Input, Inject,
    EventEmitter,
} from '@angular/core';
import { DialogModelBase } from '../dialog.model';

export class AlertData extends DialogModelBase {
    // 新属性
    title = '提示';
    content: string;

    constructor() {
        super();
        this.validFields.push('title', 'content');
    }
}

@Component({
    selector: 'ng-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class NgAlertComponent implements OnInit {

    constructor(public data: AlertData) { }

    ngOnInit() {
    }
    public onSure(event) {
        this.data.isOpen = false;
        this.data.sure.emit(event);
    }
}


import {
    Component, OnInit, Input, Inject,
    EventEmitter,
} from '@angular/core';
import { DialogModelBase } from '../dialog.model';

export class ConfirmData extends DialogModelBase {
    // 新特性
    closeOnSure = true;
    content: string;
    closeTxt = '取消';

    constructor() {
        super();
        this.validFields.push('content', 'closeOnSure', 'closeTxt');
    }
}

@Component({
  selector: 'ng-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class NgConfirmComponent implements OnInit {
    constructor(public data: ConfirmData) { }

    ngOnInit() {
    }
    public onSure(event) {
        if (this.data.closeOnSure) {
            this.data.isOpen = false;
        }
        this.data.sure.emit(event);
    }
    public onClose(event) {
        this.data.isOpen = false;
        this.data.close.emit(event);
    }
}

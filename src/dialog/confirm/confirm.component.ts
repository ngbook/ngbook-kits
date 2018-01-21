
import {
    Component, AfterViewInit, Input, Inject,
    EventEmitter, OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DialogModelBase } from '../dialog.model';

export class ConfirmData extends DialogModelBase {
    // 新特性
    closeOnSure = true;
    content: string;
    closeTxt = '取消';

    // 使用 Subject 的方式输出用户点击事件（点击了确定还是取消）
    choice = new Subject<boolean>();

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
export class NgConfirmComponent implements OnDestroy {
    constructor(public data: ConfirmData) { }

    ngOnDestroy() {
        this.data.choice.unsubscribe();
    }
    public onSure(event) {
        if (this.data.closeOnSure) {
            this.data.isOpen = false;
        }
        this.data.choice.next(true);
        this.data.sure.emit(event);
    }
    public onClose(event) {
        this.data.isOpen = false;
        this.data.choice.next(false);
        this.data.close.emit(event);
    }
}

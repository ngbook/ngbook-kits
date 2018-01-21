
import {
    Component, AfterViewInit, Input, Inject,
    EventEmitter, ViewChild, ElementRef, OnDestroy,
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
export class NgConfirmComponent implements AfterViewInit {
    @ViewChild('closeBtn', {read: ElementRef})
    closeBtn: ElementRef;
    @ViewChild('sureBtn', {read: ElementRef})
    sureBtn: ElementRef;

    constructor(public data: ConfirmData) { }

    ngAfterViewInit() {
        const closeObserve = Observable.fromEvent(
            this.closeBtn.nativeElement, 'click').subscribe(() => {
                this.data.choice.next(false);
            });
        const sureObserve = Observable.fromEvent(
            this.sureBtn.nativeElement, 'click').subscribe(() => {
                this.data.choice.next(true);
            });
        this.data.choice.subscribe((result) => {
            console.log('-->', result);
        });
    }
    ngOnDestroy() {
        this.data.choice.unsubscribe();
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

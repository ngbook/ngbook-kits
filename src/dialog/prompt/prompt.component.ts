
import {
    Component, OnInit, Input, Inject,
    EventEmitter,
} from '@angular/core';
import { DialogModelBase } from '../dialog.model';

export class PromptData extends DialogModelBase {
    // 新特性
    closeOnSure = true;
    content: string;
    closeTxt = '取消';
    value: string;

    constructor() {
        super();
        this.validFields.push('content', 'closeOnSure',
            'closeTxt', 'value');
    }
}

@Component({
  selector: 'ng-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class NgPromptComponent implements OnInit {
    constructor(public data: PromptData) { }

    ngOnInit() {
    }
    public onSure(event) {
        if (this.data.closeOnSure) {
            this.data.isOpen = false;
        }
        this.data.sure.emit({
            event,
            value: this.data.value
        });
    }
    public onClose(event) {
        this.data.isOpen = false;
        this.data.close.emit(event);
    }
}

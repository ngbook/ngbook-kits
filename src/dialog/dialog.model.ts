import { ComponentRef, EventEmitter } from '@angular/core';
import {
    DomPortalHost,
    ComponentPortal,
} from '@angular/cdk/portal';

/**
 * 用于记录一个dialog的信息
 */
export class DialogData<T> {
    public compRef: ComponentRef<T>;

    constructor(private portal: ComponentPortal<T>,
        public host: DomPortalHost,
        public data: DialogModelBase) {
    }

    public open() {
        // console.log('open...');
        this.compRef = this.host.attachComponentPortal(this.portal);
    }
    public close() {
        // console.log('close...');
        this.host.detach();
    }

    public get onSure() {
        return this.data.sure;
    }
    public get onClose() {
        return this.data.sure;
    }
    public setProperty(key, value) {
        if (!key || !value) {
            return;
        }
        this.data[key] = value;
    }
    public getProperty<T>(key): T {
        if (!key) {
            return null;
        }
        return this.data[key];
    }
}

export abstract class DialogModelBase {
    sure: EventEmitter<any> = new EventEmitter();
    close: EventEmitter<any> = new EventEmitter();

    validFields = [
        'isOpen', 'overlayClosable', 'width',
        'height', 'sureTxt', 'minWidth'
    ];
    isOpen = true; // 组件一被创建就显示
    overlayClosable = false;

    width: number;
    height: number;
    minWidth: number;
    sureTxt = '确定';

    get baseStyle() {
        return {
            'width.px': this.width,
            'height.px': this.height,
            'min-width.px': this.minWidth,
        };
    }

    updateOpts(opts) {
        if (opts) {
            // 只允许validFields里定义的一些key
            this.validFields.forEach((key) => {
                if (opts[key]) {
                    this[key] = opts[key];
                }
            });
        }
    }
}

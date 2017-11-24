import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef, ReflectiveInjector,
    Injector, Inject,
} from '@angular/core';
import {
    DomPortalHost,
    ComponentPortal,
    ComponentType,
} from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { NgAlertComponent, AlertData } from './alert/alert.component';
import { NgConfirmComponent, ConfirmData } from './confirm/confirm.component';
import { NgPromptComponent, PromptData } from './prompt/prompt.component';
import { DialogData, DialogModelBase } from './dialog.model';

@Injectable()
export class DialogService {
    // private modalVector = [] as Array<DialogData<any>>;

    constructor(
        @Inject(DOCUMENT) private document,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    alert(content: string, title = '提示', opts?: any) {
        // 生成数据模型的实例，并传入相关的数据
        const data = new AlertData();
        data.title = title;
        data.content = content;
        data.updateOpts(opts);
        // 把 Injector 再包装一层，带入上面的数据模型
        const injector = this.resolveInputs([{
            provide: AlertData, useValue: data
        }]);
        // 生成 portal 和 host 两个主角
        const portal = new ComponentPortal(NgAlertComponent);
        const host = this.genHost(injector);
        // 生成一个 DialogData 对象，并把它返回
        // DialogData 对象用于控制这个弹框
        const dialog = new DialogData<NgAlertComponent>(portal, host, data);
        setTimeout(() => {
            dialog.open();
        });
        // this.modalVector.push(dialog);
        return dialog;
    }

    confirm(content: string, opts?: any) {
        const data = new ConfirmData();
        data.content = content;
        data.updateOpts(opts);
        const injector = this.resolveInputs([{
            provide: ConfirmData, useValue: data
        }]);
        const portal = new ComponentPortal(NgConfirmComponent);
        const host = this.genHost(injector);
        const dialog = new DialogData<NgConfirmComponent>(
            portal, host, data);
        setTimeout(() => {
            dialog.open();
        });
        return dialog;
    }

    prompt(content: string, opts?: any) {
        const data = new PromptData();
        data.content = content;
        data.updateOpts(opts);
        const injector = this.resolveInputs([{
            provide: PromptData, useValue: data
        }]);
        const portal = new ComponentPortal(NgPromptComponent);
        const host = this.genHost(injector);
        const dialog = new DialogData<NgPromptComponent>(
            portal, host, data);
        setTimeout(() => {
            dialog.open();
        });
        return dialog;
    }

    private genHost(injector?: Injector) {
        if (!injector) {
            injector = this.injector;
        }
        return new DomPortalHost(
            this.document.body,
            this.componentFactoryResolver,
            this.appRef,
            injector);
    }

    private resolveInputs(provides) {
        const resolved = ReflectiveInjector.resolve(provides);
        return ReflectiveInjector.fromResolvedProviders(
            resolved, this.injector);
    }
}

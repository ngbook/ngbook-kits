
import {
    NgModule,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgButtonModule } from '../ng-button';
import { PortalModule } from '@angular/cdk/portal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogService } from './dialog.service';
import { ModalModule } from '../modal';
import { NgAlertComponent } from './alert/alert.component';
import { NgConfirmComponent } from './confirm/confirm.component';
import { NgPromptComponent } from './prompt/prompt.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgButtonModule,
        PortalModule,
        BrowserAnimationsModule,
        ModalModule,
    ],
    exports: [
        NgAlertComponent,
        NgConfirmComponent,
    ],
    declarations: [
        NgAlertComponent,
        NgConfirmComponent,
        NgPromptComponent,
    ],
    entryComponents: [
        NgAlertComponent,
        NgConfirmComponent,
        NgPromptComponent,
    ],
    providers: [
        DialogService,
    ]
})
export class DialogModule {
    public static forRoot() {
        return {
            ngModule: DialogModule,
            providers: [ DialogService ]
        };
    }
}

export { DialogService };

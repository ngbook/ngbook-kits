
import {
    NgModule,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NgButtonModule } from '../ng-button';
import { PortalModule } from '@angular/cdk/portal';
import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { NgModalComponent } from './modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgButtonModule,
        PortalModule,
        BrowserAnimationsModule,
    ],
    exports: [
        NgModalComponent,
    ],
    declarations: [
        NgModalComponent,
    ],
})
export class ModalModule {
}

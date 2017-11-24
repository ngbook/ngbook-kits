import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import { RangeDirective } from './range.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        RangeDirective
    ],
    declarations: [
        RangeDirective,
    ],
})
export class RangeModule {
    public static forRoot() {
        return {
            ngModule: RangeModule,
            providers: [ ]
        };
    }
}

export { RangeDirective };

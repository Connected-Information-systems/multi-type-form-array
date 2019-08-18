import {
    Component,
    Input,
} from '@angular/core';
import { MultiTypeElement } from './types/multi-type-element/multi-type-element';

@Component({
    template: '',
    selector: 'ngx-multi-type-form-array'
})
export class NgxMultiTypeFormArrayMockComponent {

    @Input() formArrayName: string;
    @Input() registeredElements: Map<string, MultiTypeElement>;
}

import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';
import { MultiTypeElement } from '../multi-type-element/multi-type-element';

export class MultiTypeFormArray extends FormArray {

    private _multiTypeElements: MultiTypeElement[] = [];

    constructor(
        private toMultiTypeElement: (value: any) => MultiTypeElement,
        controls: AbstractControl[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    updateValueAndValidity(options: { onlySelf?: boolean; emitEvent?: boolean } = {}) {
        if (this.controls.length > 0 && !options.onlySelf) {
            this.validateChildren();
        }
        super.updateValueAndValidity(options);
    }

    private validateChildren() {
        _.forEach(this.controls, control => {
            if (control.enabled) {
                control.updateValueAndValidity({ emitEvent: false, onlySelf: true });
            }
        });
    }

    removeAt(index: number): void {
        super.removeAt(index);
        this._multiTypeElements.splice(index, 1);
    }

    reset(value?: any, options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        this.resetControls();
        this.createControlsForValues(value);
    }

    patchValue(value: any[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        this.resetControls();
        this.createControlsForValues(value);
        super.patchValue(value, options);
    }

    setValue(values: any[], options?: { onlySelf?: boolean; emitEvent?: boolean }): void {
        this.resetControls();
        this.createControlsForValues(values);
        super.setValue(values, options);
    }

    pushElement(element: MultiTypeElement): AbstractControl {
        this._multiTypeElements.push(element);
        const control = element.control;
        this.push(control);
        return control;
    }

    private createControlsForValues(values: any[]) {
        if (values) {
            values.forEach(element => {
                const multiTypeElement = this.toMultiTypeElement(element);
                const control = this.pushElement(multiTypeElement);
                control.patchValue(element);
                this.updateValueAndValidity();
            });
        }
    }

    resetControls(): void {
        this.controls = [];
        this._multiTypeElements = [];
    }

    getMultiTypeElement(index: number): MultiTypeElement {
        return this._multiTypeElements[ index ];
    }

    get multiTypeElements(): MultiTypeElement[] {
        return this._multiTypeElements;
    }
}

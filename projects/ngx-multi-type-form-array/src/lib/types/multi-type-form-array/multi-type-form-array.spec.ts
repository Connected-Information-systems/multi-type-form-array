import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { MultiTypeFormArray } from './multi-type-form-array';
import { MT_ELEMENT_FORM, MultiTypeElement } from '../multi-type-element/multi-type-element';
import { Component, Inject } from '@angular/core';

const asyncValidator = ((control) => of({ error: 'asyncError' })) as AsyncValidatorFn;

const enum TestTypes {
    TYPE1 = 'test_type_1',
    TYPE2 = 'test_type_2',
    TYPE3 = 'test_type_3'
}


@Component({
    selector: 'ngx-test-1',
    template: `
        <div [formGroup]="formGroup">
            <input formControlName="elementType">
            <input formControlName="control2">
        </div>
    `
})
class Test1Component {

    formGroup: FormGroup;

    constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
        this.formGroup = formGroup;
    }
}


@Component({
    selector: 'ngx-test-2',
    template: `
        <div [formGroup]="formGroup">
            <input formControlName="elementType">
            <input formControlName="control2">
            <input formControlName="control3">
        </div>`
})
class Test2Component {

    formGroup: FormGroup;

    constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
        this.formGroup = formGroup;
    }
}

function getType1MultiTypeElement(formBuilder) {
    const formGroupCreator = () => formBuilder.group({
        elementType: TestTypes.TYPE1,
        control2: ''
    });
    return new MultiTypeElement('Form Array Element Title', formGroupCreator, Test1Component);
}

function getType2MultiTypeElement(formBuilder) {
    const formGroupCreator = () => formBuilder.group({
        elementType: TestTypes.TYPE2,
        control2: '',
        control3: ''
    });
    return new MultiTypeElement('Form Array Element Title', formGroupCreator, Test2Component);
}

function getType3MultiTypeElementUniqueInList(formBuilder) {
    const formGroupCreator = () => formBuilder.group({
        elementType: TestTypes.TYPE3,
        control2: 'type'
    });
    return new MultiTypeElement('Form Array Unique Element Title', formGroupCreator, Test1Component);
}

describe('multiTypeFormArray', () => {
    const formBuilder = new FormBuilder();
    let formArray: MultiTypeFormArray;

    const formArrayMap: Map<string, MultiTypeElement> = new Map<string, MultiTypeElement>();
    formArrayMap.set(TestTypes.TYPE1, getType1MultiTypeElement(formBuilder));
    formArrayMap.set(TestTypes.TYPE2, getType2MultiTypeElement(formBuilder));
    formArrayMap.set(TestTypes.TYPE3, getType3MultiTypeElementUniqueInList(formBuilder));

    beforeEach(() => {
        formArray = new MultiTypeFormArray((value) => formArrayMap.get(value.elementType as TestTypes), [],
            Validators.required,
            asyncValidator);
    });

    describe('initialization', () => {
        it('should have no children', () => {
            expect(formArray.controls.length).toBe(0);
            expect(formArray.multiTypeElements.length).toBe(0);
        });

        it('should have the validator', () => {
            expect(formArray.validator).toEqual(Validators.required);
        });

        it('should have the async validator', () => {
            expect(formArray.asyncValidator).toEqual(asyncValidator);
        });

        it('should have one child', () => {
            const control = new FormGroup({ test: new FormControl('') });
            formArray = new MultiTypeFormArray((value) => formArrayMap.get(value.elementType as TestTypes), [ control ]);
            expect(formArray.controls.length).toBe(1);
        });
    });

    describe('patchValue', () => {
        const value1 = {
            elementType: TestTypes.TYPE1,
            control2: 'value1',
        };

        const value2 = {
            elementType: TestTypes.TYPE2,
            control2: 'value2',
            control3: 'value3'
        };
        const value3 = {
            elementType: TestTypes.TYPE1,
            control2: 'value4',
        };

        const patch = [ value1, value2, value3 ];

        beforeEach(() => {
            formArray = new MultiTypeFormArray((value) => formArrayMap.get(value.elementType as TestTypes), []);
            formArray.patchValue(patch);
        });

        describe('equalizing controls with length of patch', () => {
            it('add controls if required', () => {
                expect(formArray.controls.length).toBe(3);
                expect(formArray.multiTypeElements.length).toBe(3);
            });

            it('should remove controls if required', () => {
                formArray.patchValue([ value1, value3 ]);
                expect(formArray.controls.length).toBe(2);
                expect(formArray.multiTypeElements.length).toBe(2);
            });

            it('should return elementType', () => {
                formArray.patchValue([ value1, value3 ]);
                const control = formArray.pushElement(formArrayMap.get(TestTypes.TYPE1));
                expect(formArray.controls.length).toBe(3);
                expect(formArray.multiTypeElements.length).toBe(3);
                expect(formArray.getMultiTypeElement(2)).toBe(formArrayMap.get(TestTypes.TYPE1));
                expect(formArray.controls[ 2 ]).toEqual(control);
            });
        });

        it('should have the value from the patch', () => {
            expect(formArray.value).toEqual(patch);
        });
    });

    describe('setValue', () => {
        const value1 = {
            elementType: TestTypes.TYPE1,
            control2: 'value1',
        };

        const value2 = {
            elementType: TestTypes.TYPE2,
            control2: 'value2',
            control3: 'value3'
        };
        const value3 = {
            elementType: TestTypes.TYPE1,
            control2: 'value4',
        };

        const patch = [ value1, value2, value3 ];

        beforeEach(() => {
            formArray.setValue(patch);
        });

        describe('equalizing controls with length of patch', () => {
            it('add controls if required', () => {
                expect(formArray.controls.length).toBe(3);
                expect(formArray.multiTypeElements.length).toBe(3);
            });

            it('should remove controls if required', () => {
                formArray.patchValue([ value1, value3 ]);
                expect(formArray.controls.length).toBe(2);
                expect(formArray.multiTypeElements.length).toBe(2);
            });
            it('should remove controls when patch empty values', () => {
                formArray.patchValue([]);
                expect(formArray.controls.length).toBe(0);
                expect(formArray.multiTypeElements.length).toBe(0);
            });
        });

        it('should have the value from the patch', () => {
            expect(formArray.value).toEqual(patch);
        });
    });

    describe('add control with pushElement', () => {

        beforeEach(() => {
            formArray = new MultiTypeFormArray((value) => formArrayMap.get(value.elementType as TestTypes), []);
        });

        it('should add a child control', () => {
            formArray.pushElement(formArrayMap.get(TestTypes.TYPE1));
            expect(formArray.controls.length).toBe(1);
            expect(formArray.multiTypeElements.length).toBe(1);
        });

    });

    describe('remove controls', () => {

        let control3: AbstractControl;
        const value1 = {
            elementType: TestTypes.TYPE1,
            control2: 'value1',
        };
        beforeEach(() => {
            formArray = new MultiTypeFormArray((value) => formArrayMap.get(value.elementType as TestTypes), []);
            formArray.pushElement(formArrayMap.get(TestTypes.TYPE1));
            formArray.pushElement(formArrayMap.get(TestTypes.TYPE2));
            control3 = formArray.pushElement(formArrayMap.get(TestTypes.TYPE1));
        });

        it('should remove the provided controls', () => {
            formArray.removeAt(1);
            formArray.removeAt(0);
            expect(formArray.controls.length).toBe(1);
            expect(formArray.multiTypeElements.length).toBe(1);
            expect(formArray.controls[ 0 ]).toBe(control3);
        });

        it('should remove the control if it can find it', () => {
            formArray.pushElement(formArrayMap.get(TestTypes.TYPE1));
            expect(formArray.controls.length).toBe(4);
            expect(formArray.multiTypeElements.length).toBe(4);
            formArray.removeAt(0);
            expect(formArray.controls.length).toBe(3);
            expect(formArray.multiTypeElements.length).toBe(3);
        });

        it('should not remove the control if it can not find it', () => {
            formArray.pushElement(formArrayMap.get(TestTypes.TYPE1));
            expect(formArray.controls.length).toBe(4);
            expect(formArray.multiTypeElements.length).toBe(4);
            formArray.removeAt(10);
            expect(formArray.controls.length).toBe(4);
            expect(formArray.multiTypeElements.length).toBe(4);
        });

        it('should reset the form to empty form when call with empty values', () => {
            formArray.reset([]);
            expect(formArray.controls.length).toBe(0);
            expect(formArray.multiTypeElements.length).toBe(0);
        });

        it('should reset the form and add one element back', () => {
            formArray.reset([ value1 ]);
            expect(formArray.controls.length).toBe(1);
            expect(formArray.multiTypeElements.length).toBe(1);
        });

        it('should delete everything', () => {
            formArray.reset(null);
            expect(formArray.controls.length).toBe(0);
            expect(formArray.multiTypeElements.length).toBe(0);
        });
    });

    describe('updateValueAndValidity', () => {
        let control1: AbstractControl;
        let control2: AbstractControl;
        const elementUnique = {
            elementType: TestTypes.TYPE3,
            control2: 'value',
        };
        const elementCommon = {
            elementType: TestTypes.TYPE1,
            control2: 'other-value',
        };

        beforeEach(() => {
            formArray = new MultiTypeFormArray((value) => formArrayMap.get(value.elementType as TestTypes), []);
            formArray.setValue([ elementUnique, elementUnique ]);
            control1 = formArray.controls[ 0 ];
            control2 = formArray.controls[ 1 ];
        });

        it('should be in the correct state', () => {
            expect(control1.valid).toBeFalsy();
            expect(control2.valid).toBeFalsy();
            expect(formArray.valid).toBeFalsy();
        });

        it('should validate all children when one child updates validation', () => {
            control1.setValue(elementCommon);
            expect(control1.valid).toBeTruthy('control1 should have been valid');
            expect(control2.valid).toBeTruthy('control2 should have been valid');
            expect(formArray.valid).toBeTruthy('array should have been valid');
        });

        it('should not validate children when option "onlySelf" is active', () => {
            control1.patchValue(elementCommon, { onlySelf: true });
            expect(control1.valid).toBeTruthy('control 1 should have been valid');
            formArray.updateValueAndValidity({ onlySelf: true });
            expect(control2.valid).toBeFalsy('control2 should have been invalid');
            expect(formArray.valid).toBeFalsy('the array should have been invalid');
        });

        it('should not validate children when disabled', () => {
            formArray.reset([ elementCommon, elementUnique ]);
            control1.disable();
            control2.disable();
            formArray.updateValueAndValidity();
            expect(formArray.valid).toBeTruthy('array should have been valid');
        });
    });
});

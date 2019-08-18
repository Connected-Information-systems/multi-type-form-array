import { AbstractControl } from '@angular/forms';
import { InjectionToken, Type } from '@angular/core';

export class MultiTypeElement {

    name: string;
    componentType: Type<any>;
    private readonly _control: () => AbstractControl;

    constructor(name: string, control: () => AbstractControl, component: Type<any>) {
        this._control = control;
        this.componentType = component;
        this.name = name;
    }

    get control(): AbstractControl {
        return this._control();
    }
}

/*
*
* <p>This injector is mandatory for any multiTypeForm template </p>
* ### Example
* ```
* const enum TestTypes {
*     TYPE1 = 'type_1',
*     TYPE2 = 'type_2',
* }
*
*
* @Component(
*   selector: 'host-comp',
*   template: `
*       <form [formGroup]="form">
*           <multi-type-form-array
*               formArrayName="testArray"
*               [registeredElements]="formArrayMap">
*           </multi-type-form-array>
*       </form>`)
* export class HostComponent {
*
*   constructor(){
*       formArrayMap = new Map<string, MultiTypeElement>();
*       formArrayMap.set(TestTypes.TYPE1, getMultiTypeElement(this.formBuilder));
*   }
*
*   getMultiTypeElement(formBuilder) {
*       const formGroupCreator = () => formBuilder.group({
*           elementType: TestTypes.TYPE1,
*           control2: '',
*           control3: ''
*       });
*       return new MultiTypeElement('Form Array Element Title', formGroupCreator, MyCustomComponent);
*   }
*
* }
*
* @Component()
* export class MyCustomComponent {
*
*     formGroup: FormGroup;
*
*     constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
*         this.formGroup = formGroup;
*     }
* }
* ```
*
* */
export const MT_ELEMENT_FORM = new InjectionToken<any>('form');

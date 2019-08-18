import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMultiTypeFormArrayComponent } from './ngx-multi-type-form-array.component';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MultiTypeFormArray } from './types/multi-type-form-array/multi-type-form-array';
import { MT_ELEMENT_FORM, MultiTypeElement } from './types/multi-type-element/multi-type-element';




const enum TestTypes {
  TYPE1 = 'test_type_1',
  TYPE2 = 'test_type_2',
  TYPE3 = 'test_type_3'
}

@Component({
  selector: 'ngx-host-comp',
  template: `
        <form [formGroup]="form">
            <multi-type-form-array
                formArrayName="testArray"
                [registeredElements]="formArrayMap">
            </multi-type-form-array>
        </form>
    `,
})
class HostComponent {

  form: FormGroup;
  formBuilder = new FormBuilder();
  formArrayMap = this.getFormArrayMap();

  constructor() {
    this.form = this.formBuilder.group({
      testArray: new MultiTypeFormArray((value) => this.formArrayMap.get(value.elementType as TestTypes), [])
    });
  }

  private getFormArrayMap(): Map<string, MultiTypeElement> {
    const formArrayMap = new Map<string, MultiTypeElement>();
    formArrayMap.set(TestTypes.TYPE1, getType1MultiTypeElement(this.formBuilder));
    formArrayMap.set(TestTypes.TYPE2, getType2MultiTypeElement(this.formBuilder));
    formArrayMap.set(TestTypes.TYPE3, getType3MultiTypeElementUniqueInList(this.formBuilder));
    return formArrayMap;
  }

  get multiTypeFormArray(): MultiTypeFormArray {
    return this.form.get('testArray') as MultiTypeFormArray;
  }
}


@Component({
  selector: 'ngx-test-1',
  template: `
        <div [formGroup]="formGroup">
            <input formControlName="elementType">
            <input formControlName="control2">
        </div>
    `,
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
        </div>`,
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




describe('NgxMultiTypeFormArrayComponent', () => {
  let component: NgxMultiTypeFormArrayComponent;
  let fixture: ComponentFixture<NgxMultiTypeFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMultiTypeFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMultiTypeFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

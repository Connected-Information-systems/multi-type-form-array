import {
  Component,
  Host,
  Input,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { MultiTypeElement } from './types/multi-type-element/multi-type-element';
import { MultiTypeFormArray } from './types/multi-type-form-array/multi-type-form-array';

@Component({
  selector: 'ngx-multi-type-form-array',
  templateUrl: 'ngx-multi-type-form-array.component.html',
  styleUrls: [ 'ngx-multi-type-form-array.component.scss' ]
})
export class NgxMultiTypeFormArrayComponent implements OnInit {

  formArrayControl: MultiTypeFormArray;
  elementType: FormControl;

  @Input()
  formArrayName: string;

  @Input()
  registeredElements: Map<string, MultiTypeElement>;

  constructor(
    @Host() @SkipSelf()
    private controlContainer: ControlContainer,
  ) {
    if (!controlContainer) {
      throw new Error(`Control container is not set. The value received is: ${controlContainer} `);
    }
  }

  ngOnInit() {
    this.setForm();
    this.elementType = new FormControl('');
  }

  get formArrayControls(): Map<AbstractControl, MultiTypeElement> {
    const result = new Map<AbstractControl, MultiTypeElement>();
    _.zip(this.formArrayControl.controls, this.formArrayControl.multiTypeElements)
      .map(element => result.set(element[ 0 ], element[ 1 ]));
    return result;
  }

  hasErrors(control: AbstractControl): boolean {
    return !!control.errors;
  }

  getControlName(index: number): string {
    return this.formArrayControl.getMultiTypeElement(index).name;
  }

  addNewElement() {
    const multiTypeElement = this.elementType.value;
    this.formArrayControl.pushElement(multiTypeElement);
  }

  private setForm() {
    if (!this.formArrayName) {
      throw new Error('formArrayName not Specified');
    }
    this.formArrayControl = this.controlContainer.control.get(this.formArrayName) as MultiTypeFormArray;
  }

  removeControl(i: number) {
    this.formArrayControl.removeAt(i);
  }
}

import { Component, Inject } from '@angular/core';
import { MT_ELEMENT_FORM } from 'NgxMultiTypeFormArray';

@Component({
  selector: 'multi-type-test',
  templateUrl: './test.component.html',
})
export class TestComponent {

  constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
  }
}

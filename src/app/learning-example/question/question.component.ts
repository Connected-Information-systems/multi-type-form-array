import { Component, Inject } from '@angular/core';
import { MT_ELEMENT_FORM } from 'NgxMultiTypeFormArray';

@Component({
  selector: 'multi-type-question',
  templateUrl: './question.component.html',
})
export class QuestionComponent {

  constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
  }
}

import { Component, Inject } from '@angular/core';
import { MT_ELEMENT_FORM } from 'NgxMultiTypeFormArray';

@Component({
  selector: 'multi-type-lesson',
  templateUrl: './lesson.component.html',
})
export class LessonComponent {

  constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
  }
}

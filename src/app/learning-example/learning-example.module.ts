import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson/lesson.component';
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './question/question.component';
import { LearningExamplePageComponent } from './learning-example-page/learning-example-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LessonComponent,
    TestComponent,
    QuestionComponent,
    LearningExamplePageComponent
  ]
})
export class LearningExampleModule {
}

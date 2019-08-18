import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LearningExampleModule } from './learning-example/learning-example.module';
import { NgxMultiTypeFormArrayModule } from 'NgxMultiTypeFormArray';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMultiTypeFormArrayModule,
    LearningExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

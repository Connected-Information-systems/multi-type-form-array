import { NgModule } from '@angular/core';
import { NgxMultiTypeFormArrayComponent } from './ngx-multi-type-form-array.component';
import { FormArrayHostDirective } from './directives/form-array-host.directive';
import { NgxMultiTypeFormArrayMockComponent } from './ngx-multi-type-form-array.component.mock';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NgxMultiTypeFormArrayComponent,
    NgxMultiTypeFormArrayMockComponent,
    FormArrayHostDirective
  ],
  exports: [
    NgxMultiTypeFormArrayComponent
  ]
})
export class NgxMultiTypeFormArrayModule {
}

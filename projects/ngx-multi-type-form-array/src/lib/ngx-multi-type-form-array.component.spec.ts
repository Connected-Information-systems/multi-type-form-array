import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMultiTypeFormArrayComponent } from './ngx-multi-type-form-array.component';

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

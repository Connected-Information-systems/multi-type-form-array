import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningExamplePageComponent } from './learning-example-page.component';

describe('LearningExamplePageComponent', () => {
  let component: LearningExamplePageComponent;
  let fixture: ComponentFixture<LearningExamplePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningExamplePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

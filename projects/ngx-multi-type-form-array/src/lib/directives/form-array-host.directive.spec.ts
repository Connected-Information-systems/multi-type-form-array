import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormArrayHostDirective } from './form-array-host.directive';
import {
  Component, DebugElement,
  Inject,
  Injector, Type, ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MT_ELEMENT_FORM, MultiTypeElement } from '../types/multi-type-element/multi-type-element';
import { By } from '@angular/platform-browser';

const enum TestTypes {
    TYPE1 = 'test_type_1'
}

@Component({
    selector: 'test-1',
    template: `<p>just-a-test</p>`
})
class TestInjectComponent {

    constructor(@Inject(MT_ELEMENT_FORM) public formGroup) {
    }
}

@Component({
    selector: 'test-1',
    template: `
        <ng-template formArrayHost></ng-template>`
})
class TestHostComponent {

    @ViewChild(FormArrayHostDirective)
    directive: FormArrayHostDirective;

    constructor() {
    }
}

function getType1MultiTypeElement() {
    const formBuilder = new FormBuilder();
    const formGroupCreator = () => formBuilder.group({
        elementType: TestTypes.TYPE1,
        control2: ''
    });
    return new MultiTypeElement('Form Array Element Title', formGroupCreator, TestInjectComponent);
}

describe('FormArrayHostDirective', () => {

    let multiTypeElement: MultiTypeElement;
    let controlElement: KeyValue<AbstractControl, MultiTypeElement>;
    let hostDirective: FormArrayHostDirective;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FormArrayHostDirective,
                TestInjectComponent,
                TestHostComponent
            ],
            imports: [
                ReactiveFormsModule,
                MatInputModule,
                NoopAnimationsModule
            ],
            providers: [
                Injector,
                ViewContainerRef
            ]

        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [ TestInjectComponent, TestHostComponent ],
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        multiTypeElement = getType1MultiTypeElement();
        controlElement = { key: multiTypeElement.control, value: multiTypeElement };
        hostDirective = TestBed.createComponent(TestHostComponent).componentInstance.directive;
    });

    it('should create hostDirective', () => {
        expect(hostDirective).toBeTruthy();
    });

    it('should construct component when multiTypeElement is provided', () => {
        hostDirective.multiTypeElement = controlElement;
        expect(hostDirective).toBeTruthy();
    });

    it('should have form provided when a new instance is created', () => {
        const fixture = TestBed.createComponent(TestHostComponent);
        const component = fixture.componentInstance;
        component.directive.multiTypeElement = controlElement;
        const injectedComponent = findDirectiveByType(fixture, TestInjectComponent);
        expect(injectedComponent.formGroup).toBe(controlElement.key);
    });
});

export function findDirectiveByType<T>(fixture: ComponentFixture<any>, directive: Type<T>): T {
  const element = queryElementByDirectiveType(fixture, directive);
  return element.injector.get(directive);
}

export function queryElementByDirectiveType(fixture: ComponentFixture<any>, directive: Type<any>): DebugElement {
  return fixture.debugElement.query(By.directive(directive));
}

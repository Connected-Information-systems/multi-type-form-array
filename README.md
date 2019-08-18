# MultiTypeFormArray

Module created to handle a FormArray that may contains multiple types

TODO

# Examples/Demo

A simple Example can be found under `src/app/learning-example` directory of this repository. 

In this example we have :
- `learning-element.interface.ts` containing datamodel for our example: 
    - `LearningElement` is the parent interface having one property `type` that will be used to identify the type of the element that will be generated
        - `Lesson extends LearningElement`
        - `Test extends LearningElement`
        - `Question extends LearningElement`
    - An enum `LearningElementType` is used to keep track or the types used

- for each type is created a template component having two important parts:
    - the .html file contains the template that will be rendered
    - the .ts file, must have in constructor the following dependency: `@Inject(MT_ELEMENT_FORM) formGroup` that will pass the form to the template

TODO

# Installation

`npm install multi-type-form-array` or `npm i multi-type-form-array`

# API

TODO

# Usage
```
const enum TestTypes {
    TYPE1 = 'type_1',
    TYPE2 = 'type_2',
}


@Component(
  selector: 'host-comp',
  template: `
      <form [formGroup]="form">
          <multi-type-form-array
              formArrayName="testArray"
              [registeredElements]="formArrayMap">
          </multi-type-form-array>
      </form>`)
export class HostComponent {

  constructor(){
      formArrayMap = new Map<string, MultiTypeElement>();
      formArrayMap.set(TestTypes.TYPE1, getMultiTypeElement(this.formBuilder));
  }

  getMultiTypeElement(formBuilder) {
      const formGroupCreator = () => formBuilder.group({
          elementType: TestTypes.TYPE1,
          control2: '',
          control3: ''
      });
      return new MultiTypeElement('Form Array Element Title', formGroupCreator, MyCustomComponent);
  }

}

@Component()
export class MyCustomComponent {

    formGroup: FormGroup;

    constructor(@Inject(MT_ELEMENT_FORM) formGroup) {
        this.formGroup = formGroup;
    }
}
```
TODO

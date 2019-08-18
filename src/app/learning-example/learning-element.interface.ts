export interface LearningElement {
  type: string;
}

export interface Lesson extends LearningElement {
  type: string;
  name: string;
  time: number;
}


export interface Test extends LearningElement {
  type: string;
  name: string;
  numberOfQuestions: number;
}

export interface Question extends LearningElement {
  type: string;
  question: string;
  answer: string;
}

export enum LearningElementType {
  LESSON = 'lesson',
  TEST = 'test',
  QUESTION = 'question'
}

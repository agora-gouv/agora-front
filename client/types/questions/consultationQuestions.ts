export class ConsultationQuestions {
  questionCount: number
  questions: Question[]
  
  constructor(questionCount: number, questions: Question[]) {
    this.questionCount = questionCount;
    this.questions = questions;
  }
}

type Question = QuestionUniqueChoice | QuestionOpened | QuestionMultipleChoices | Chapter | QuestionWithCondition

export class QuestionUniqueChoice {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  nextQuestionId?: string
  possibleChoices: Choice[]

  constructor(id: string, title: string, popupDescription: string, order: number, questionProgress: string, questionProgressA11y: string, nextQuestionId: string, possibleChoices: Choice[]) {
    this.id = id;
    this.title = title;
    this.popupDescription = popupDescription;
    this.order = order;
    this.questionProgress = questionProgress;
    this.questionProgressA11y = questionProgressA11y;
    this.nextQuestionId = nextQuestionId;
    this.possibleChoices = possibleChoices;
  }
}

export class QuestionMultipleChoices {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  maxChoices: number
  nextQuestionId?: string
  possibleChoices: Choice[]

  constructor(id: string, title: string, popupDescription: string, order: number, questionProgress: string, questionProgressA11y: string, maxChoices: number, nextQuestionId: string, possibleChoices: Choice[]) {
    this.id = id;
    this.title = title;
    this.popupDescription = popupDescription;
    this.order = order;
    this.questionProgress = questionProgress;
    this.questionProgressA11y = questionProgressA11y;
    this.maxChoices = maxChoices;
    this.nextQuestionId = nextQuestionId;
    this.possibleChoices = possibleChoices;
  }
}

export class QuestionOpened {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  nextQuestionId?: string

  constructor(id: string, title: string, popupDescription: string, order: number, questionProgress: string, questionProgressA11y: string, nextQuestionId: string) {
    this.id = id;
    this.title = title;
    this.popupDescription = popupDescription;
    this.order = order;
    this.questionProgress = questionProgress;
    this.questionProgressA11y = questionProgressA11y;
    this.nextQuestionId = nextQuestionId;
  }
}

export class Chapter {
  id: string
  title: string
  popupDescription?: string
  order: number
  description: string
  nextQuestionId?: string
  imageUrl?: string
  imageTranscription?: string
  
  constructor(id: string, title: string, popupDescription: string, order: number, description: string, nextQuestionId: string, imageUrl: string, imageTranscription: string) {
    this.id = id;
    this.title = title;
    this.popupDescription = popupDescription;
    this.order = order;
    this.description = description;
    this.nextQuestionId = nextQuestionId;
    this.imageUrl = imageUrl;
    this.imageTranscription = imageTranscription;
  }
}

export class QuestionWithCondition {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  possibleChoices: Choice[]

  constructor(id: string, title: string, popupDescription: string, order: number, questionProgress: string, questionProgressA11y: string, possibleChoices: Choice[]) {
    this.id = id;
    this.title = title;
    this.popupDescription = popupDescription;
    this.order = order;
    this.questionProgress = questionProgress;
    this.questionProgressA11y = questionProgressA11y;
    this.possibleChoices = possibleChoices;
  }
}

export class Choice {
  id: string
  label: string
  order: number
  hasOpenTextField: boolean
  nextQuestionId?: string

  constructor(id: string, label: string, order: number, hasOpenTextField: boolean, nextQuestionId: string) {
    this.id = id;
    this.label = label;
    this.order = order;
    this.hasOpenTextField = hasOpenTextField;
    this.nextQuestionId = nextQuestionId;
  }
}
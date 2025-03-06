export interface ConsultationQuestionsApiDTO {
  questionCount: number
  questionsUniqueChoice: QuestionUniqueChoiceApiDTO[]
  questionsOpened: QuestionOpenedApiDTO[]
  questionsMultipleChoices: QuestionMultipleChoicesApiDTO[]
  chapters: ChapterApiDTO[]
  questionsWithCondition: QuestionWithConditionApiDTO[]
}

export interface QuestionUniqueChoiceApiDTO {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  nextQuestionId?: string
  possibleChoices: ChoiceApiDTO[]
}

export interface QuestionMultipleChoicesApiDTO {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  maxChoices: number
  nextQuestionId?: string
  possibleChoices: ChoiceApiDTO[]
}

export interface QuestionOpenedApiDTO {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  nextQuestionId?: string
}

export interface ChapterApiDTO {
  id: string
  title: string
  popupDescription?: string
  order: number
  description: string
  nextQuestionId?: string
  imageUrl?: string
  imageTranscription?: string
}

export interface QuestionWithConditionApiDTO {
  id: string
  title: string
  popupDescription?: string
  order: number
  questionProgress: string
  questionProgressA11y: string
  possibleChoices: ChoiceApiDTO[]
}

export interface ChoiceApiDTO {
  id: string
  label: string
  order: number
  hasOpenTextField: boolean
  nextQuestionId?: string
}
export interface ConsultationResultsApiDTO {
    title: string,
    coverUrl: string,
    participantCount: number,
    resultsUniqueChoice: ConsultationUniqueChoiceQuestionResultsApiDTO[],
    resultsMultipleChoice: ConsultationMultipleChoiceQuestionResultsApiDTO[],
    resultsOpen: ConsultationOpenQuestionResultsApiDTO[],
}

export interface ConsultationUniqueChoiceQuestionResultsApiDTO {
  questionId: string,
  questionTitle: string,
  order: number,
  seenRatio: number,
  responses: ConsultationChoiceResultsApiDTO[],
}

export interface ConsultationMultipleChoiceQuestionResultsApiDTO {
  questionId: string,
  questionTitle: string,
  order: number,
  seenRatio: number,
  responses: ConsultationChoiceResultsApiDTO[],
}

export interface ConsultationOpenQuestionResultsApiDTO {
  questionId: string,
  questionTitle: string,
  order: number,
}

interface ConsultationChoiceResultsApiDTO {
  choiceId: string,
  label: string,
  ratio: number,
}
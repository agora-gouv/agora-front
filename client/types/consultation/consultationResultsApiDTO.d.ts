export interface ConsultationResultsApiDTO {
    title: string,
    coverUrl: string,
    participantCount: number,
    resultsUniqueChoice: ConsultationQuestionResultsApiDTO[],
    resultsMultipleChoice: ConsultationQuestionResultsApiDTO[],
    resultsOpen: ConsultationOpenQuestionResultsApiDTO[],
}

interface ConsultationQuestionResultsApiDTO {
  questionId: string,
  questionTitle: string,
  order: number,
  seenRatio: number,
  responses: ConsultationChoiceResultsApiDTO[],
}

interface ConsultationOpenQuestionResultsApiDTO {
  questionId: string,
  questionTitle: string,
  order: number,
}

interface ConsultationChoiceResultsApiDTO {
  choiceId: string,
  label: string,
  ratio: number,
}
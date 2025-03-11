export interface ConsultationAnswersApiDTO {
  consultationId: string
  responses: ConsultationAnswerApiDTO[]
}

interface ConsultationAnswerApiDTO {
  questionId: string
  choiceIds: string[], 
  responseText: string, 
}
import {ConsultationChoiceResultsApiDTO} from "~/client/types/consultation/consultationResultsApiDTO";

export default interface ConsultationAnswers {
    questionId: string,
    questionTitle: string,
    order: number,
    seenRatio?: number,
    responses?: ConsultationChoiceResultsApiDTO[],
    type: string,
  }
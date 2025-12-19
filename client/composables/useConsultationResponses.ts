import {
  ConsultationResultsApiDTO,
  ConsultationUniqueChoiceQuestionResultsApiDTO,
  ConsultationMultipleChoiceQuestionResultsApiDTO,
  ConsultationOpenQuestionResultsApiDTO, ConsultationChoiceResultsApiDTO
} from "~/client/types/consultation/consultationResultsApiDTO";

type Question = ResponseUniqueChoice | ResponseOpened | ResponseMultipleChoices;

export class ResponseUniqueChoice {
  constructor(
    public questionId: string,
    public questionTitle: string,
    public order: number,
    public seenRatio: number,
    public responses: ConsultationChoiceResultsApiDTO[],
  ) {}
  
  static fromApi(dto: ConsultationUniqueChoiceQuestionResultsApiDTO): ResponseUniqueChoice {
    return new ResponseUniqueChoice(
      dto.questionId,
      dto.questionTitle,
      dto.order,
      dto.seenRatio,
      dto.responses,
    );
  }
}

export class ResponseMultipleChoices {
  constructor(public questionId: string,
              public questionTitle: string,
              public order: number,
              public seenRatio: number,
              public responses: ConsultationChoiceResultsApiDTO[],
  ) {}

  static fromApi(dto: ConsultationMultipleChoiceQuestionResultsApiDTO): ResponseMultipleChoices {
    return new ResponseMultipleChoices(
      dto.questionId,
      dto.questionTitle,
      dto.order,
      dto.seenRatio,
      dto.responses,
    )
  }
}

export class ResponseOpened {
  constructor(public questionId: string,
              public questionTitle: string,
              public order: number) {
  }

  static fromApi(dto: ConsultationOpenQuestionResultsApiDTO): ResponseOpened {
    return new ResponseOpened(
      dto.questionId,
      dto.questionTitle,
      dto.order
    )
  }
}

export class ConsultationResponse {
  constructor(
    public questions: Question[],
  ) {}

  static fromApi(dto: ConsultationResultsApiDTO): ConsultationResponse {
    const questions = [
      ...dto.resultsOpen.map(ResponseOpened.fromApi),
      ...dto.resultsUniqueChoice.map(ResponseUniqueChoice.fromApi),
      ...dto.resultsMultipleChoice.map(ResponseMultipleChoices.fromApi)
    ].sort((a, b) => a.order - b.order)

    return new ConsultationResponse(
      questions
    );
  }
}
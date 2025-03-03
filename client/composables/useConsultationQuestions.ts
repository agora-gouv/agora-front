import {
  ChapterApiDTO,
  ChoiceApiDTO,
  ConsultationQuestionsApiDTO,
  QuestionMultipleChoicesApiDTO,
  QuestionOpenedApiDTO,
  QuestionUniqueChoiceApiDTO,
  QuestionWithConditionApiDTO
} from "~/client/types/consultation/consultationQuestionsDTO";
import { Ref } from "vue";

export const useConsultationQuestions = () => {
  const questions: Ref<ConsultationQuestions | undefined> = ref();
  const consultationQuestionApi = new ConsultationQuestionApi();

  const fetchQuestions = async (consultationId: string) => {
    const questionsApi = (await consultationQuestionApi.getQuestions(consultationId)).value

    questions.value =  ConsultationQuestions.fromApi(questionsApi);
  }
  
  return {questions, fetchQuestions};
}

export class QuestionUniqueChoice {
  constructor(
    public id: string,
    public title: string,
    public order: number,
    public questionProgress: string,
    public questionProgressA11y: string,
    public possibleChoices: Choice[],
    public nextQuestionId?: string,
    public popupDescription?: string
  ) {
  }

  static fromApi(dto: QuestionUniqueChoiceApiDTO): QuestionUniqueChoice {
    return new QuestionUniqueChoice(
      dto.id,
      dto.title,
      dto.order,
      dto.questionProgress,
      dto.questionProgressA11y,
      dto.possibleChoices,
      dto.nextQuestionId,
      dto.popupDescription,
    );
  }
}


class ConsultationQuestions {
  constructor(
    public questionCount: number,
    public questions: Question[],
  ) {
  }

  static fromApi(dto: ConsultationQuestionsApiDTO): ConsultationQuestions {
    const questionsOpened = dto.questionsOpened.map(QuestionOpened.fromApi);
    const questionsUniqueChoice = dto.questionsUniqueChoice.map(QuestionUniqueChoice.fromApi)
    const questionsMultipleChoices = dto.questionsMultipleChoices.map(QuestionMultipleChoices.fromApi)
    const questionsWithCondition = dto.questionsWithCondition.map(QuestionWithCondition.fromApi)
    const chapters = dto.chapters.map(Chapter.fromApi)

    return new ConsultationQuestions(
      dto.questionCount,
      [...questionsOpened, ...questionsUniqueChoice, ...questionsMultipleChoices, ...questionsWithCondition, ...chapters]
    );
  }
}

type Question = QuestionUniqueChoice | QuestionOpened | QuestionMultipleChoices | Chapter | QuestionWithCondition;

class QuestionMultipleChoices {
  constructor(public id: string,
              public title: string,
              public order: number,
              public questionProgress: string,
              public questionProgressA11y: string,
              public maxChoices: number,
              public possibleChoices: Choice[],
              public popupDescription?: string,
              public nextQuestionId?: string,
  ) {
  }

  static fromApi(dto: QuestionMultipleChoicesApiDTO): QuestionMultipleChoices {
    return new QuestionMultipleChoices(
      dto.id,
      dto.title,
      dto.order,
      dto.questionProgress,
      dto.questionProgressA11y,
      dto.maxChoices,
      dto.possibleChoices,
      dto.popupDescription,
      dto.nextQuestionId,
    )
  }
}

class QuestionOpened {
  constructor(public id: string,
              public title: string,
              public order: number,
              public questionProgress: string,
              public questionProgressA11y: string,
              public popupDescription?: string,
              public nextQuestionId?: string,) {
  }

  static fromApi(dto: QuestionOpenedApiDTO): QuestionOpened {
    return new QuestionOpened(
      dto.id,
      dto.title,
      dto.order,
      dto.questionProgress,
      dto.questionProgressA11y,
      dto.popupDescription,
      dto.nextQuestionId,
    )
  }
}

class Chapter {
  constructor(public id: string,
              public title: string,
              public order: number,
              public description: string,
              public popupDescription?: string,
              public nextQuestionId?: string,
              public imageUrl?: string,
              public imageTranscription?: string,) {
  }

  static fromApi(dto: ChapterApiDTO): Chapter {
    return new Chapter(
      dto.id,
      dto.title,
      dto.order,
      dto.description,
      dto.popupDescription,
      dto.nextQuestionId,
      dto.imageUrl,
      dto.imageTranscription,
    )
  }
}

class QuestionWithCondition {
  constructor(public id: string,
              public title: string,
              public order: number,
              public questionProgress: string,
              public questionProgressA11y: string,
              public possibleChoices: Choice[],
              public popupDescription?: string,
  ) {
  }

  static fromApi(dto: QuestionWithConditionApiDTO): QuestionWithCondition {
    return new QuestionWithCondition(
      dto.id,
      dto.title,
      dto.order,
      dto.questionProgress,
      dto.questionProgressA11y,
      dto.possibleChoices,
      dto.popupDescription,
    )
  }
}

class Choice {
  constructor(public id: string,
              public label: string,
              public order: number,
              public hasOpenTextField: boolean,
              public nextQuestionId?: string,) {
  }

  static fromApi(dto: ChoiceApiDTO): Choice {
    return new Choice(
      dto.id,
      dto.label,
      dto.order,
      dto.hasOpenTextField,
      dto.nextQuestionId,
    )
  }
}
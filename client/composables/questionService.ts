import {
  Chapter,
  ConsultationQuestions,
  QuestionMultipleChoices,
  QuestionOpened,
  QuestionUniqueChoice,
  QuestionWithCondition
} from "~/client/types/questions/consultationQuestions";
import { getQuestionsApiDto } from "~/client/composables/questions/questionApi";

export async function getQuestions(consultationId: string): Promise<ConsultationQuestions> {
  const questionsApiDto = (await getQuestionsApiDto(consultationId))

  const questionsUniqueChoice = questionsApiDto.questionsUniqueChoice.map((x): QuestionUniqueChoice => {
    return ({...x})
  })
  const questionsMultipleChoices = questionsApiDto.questionsMultipleChoices.map((x): QuestionMultipleChoices => {
    return ({...x})
  })
  const questionsOpened = questionsApiDto.questionsOpened.map((x): QuestionOpened => {
    return ({...x})
  })
  const chapters = questionsApiDto.chapters.map((x): Chapter => {
    return ({...x})
  })
  const questionsWithCondition = questionsApiDto.questionsWithCondition.map((x): QuestionWithCondition => {
    return ({...x})
  })

  return new ConsultationQuestions(
    questionsApiDto.questionCount,
    [...questionsUniqueChoice, ...questionsMultipleChoices, ...questionsOpened, ...chapters, ...questionsWithCondition]
  )
}
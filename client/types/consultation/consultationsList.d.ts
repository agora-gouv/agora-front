import Thematique from "~/client/types/thematique/thematique";

export default interface ConsultationsListApiDTO {
  ongoing: ConsultationOngoingApiDTO[],
  answered: ConsultationFinishedApiDTO[],
  finished: ConsultationFinishedApiDTO[],
}

interface ConsultationOngoingApiDTO {
  id: string,
  slug: string,
  title: string,
  coverUrl: string,
  endDate: string,
  thematique: Thematique,
  highlightLabel?: string,
  territory: string,
}

interface ConsultationFinishedApiDTO {
  id: string,
  slug: string,
  title: string,
  coverUrl: string,
  thematique: Thematique,
  step: number,
  updateLabel?: string
  updateDate: string,
  territory: string,
}
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
  thematique: ConsultationThematiqueApiDTO,
  highlightLabel?: string,
  territory: string,
}

interface ConsultationFinishedApiDTO {
  id: string,
  slug: string,
  title: string,
  coverUrl: string,
  thematique: ConsultationThematiqueApiDTO,
  step: number,
  updateLabel?: string
  updateDate: string,
  territory: string,
}

interface ConsultationThematiqueApiDTO {
  "label": string,
  "picto": string,
}
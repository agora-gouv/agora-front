import Thematique from "~/client/types/thematique/thematique";

export default interface QagsApiDTO {
  maxPageNumber: number,
  responses: QagApiDTO[],
}

interface QagApiDTO {
  qagId: string,
  thematique: Thematique,
  title: string,
  author: string,
  authorPortraitUrl: string,
  responseDate: string,
}
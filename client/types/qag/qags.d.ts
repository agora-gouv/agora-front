import Thematique from "~/client/types/thematique/thematique";

type QagID = string

interface QagWithResponseApiDTO {
  qagId: QagID,
  thematique: Thematique,
  title: string,
  author: string,
  authorPortraitUrl: string,
  responseDate: string,
}

export interface QagsWithResponsesApiDTO {
  maxPageNumber: number,
  responses: QagWithResponseApiDTO[],
}

export interface QagApiDTO  {
  "qagId": QagID,
  "thematique": {
    "label": string,
    "picto": string
  },
  "title": string,
  "description": string,
  "username": string,
  "date": string,
  "support": {
    "count": number,
    "isSupported": boolean
  },
  "isAuthor": boolean
}

export interface QagsApiDTO {
  maxPageNumber: number,
  qags: QagsApiDTO[],
  header: {
    headerId: string,
    title: string,
    message: string,
  }
}

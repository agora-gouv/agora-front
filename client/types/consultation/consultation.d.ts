import Thematique from "~/client/types/thematique/thematique";

export default interface Consultation{
  title: string,
  coverUrl: string,
  shareText: string,
  thematique: Thematique,
  questionsInfo: {
    endDate: string,
    questionCount: string,
    estimatedTime: string,
    participantCount: number,
    participantCountGoal: number
  } | null,
  consultationDates: {
    startDate: string,
    endDate: string
  } | null,
  responsesInfo: { // Nullable
    picto: string,
    description: string,
    actionText: string
  } | null,
  infoHeader: {
    picto: string,
    description: string
  },
  body: {
    sections : Section[]
  },
  participationInfo: {
    participantCount: number
    participantCountGoal: number
  } | null,
  downloadAnalysisUrl: string,
  feedbackQuestion: {
    title: string,
    picto: string,
    description: string
  },
  goals: {
    picto: string,
    description: string
  }[] | null,
  footer: {
    title: string,
    description: string
  } | null,
  history: ConsultationUpdate[]
}

interface ConsultationUpdate{
  updateId: string,
  type: ConsultationUpdateType,
  status: ConsultationUpdateStatus,
  title: string,
  date?: string,
  actionText?: string
}

type ConsultationUpdateType =  "update" | "results"
type ConsultationUpdateStatus =  "done" | "current" | "incoming"

export type Section = SectionTitre | SectionTexteRiche | SectionImage | SectionVideo | SectionFocusNumber | SectionAccordion | SectionQuote;

interface SectionTitre{
  type: 'title',
  title: string
}

interface SectionTexteRiche{
  type: 'richText',
  description: string
}

interface SectionImage{
  type: 'image',
  url: string,
  description: string
}

interface SectionVideo{
  type: 'video',
  url: string,
  videoWidth: number,
  videoHeight: number,
  authorInfo: {
    name: string,
    message: string,
    date: string
  } | null,
  transcription: string
}

interface SectionFocusNumber{
  type: 'focusNumber',
  title: string,
  description: string
}

interface SectionAccordion{
  type: 'accordion',
  title: string,
  sections: Section[]
}

interface SectionQuote{
  type: 'quote',
  description: string
}
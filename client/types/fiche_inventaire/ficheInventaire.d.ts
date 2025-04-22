import Thematique from "~/client/types/thematique/thematique";

interface FicheInventaireApiDTO {
  etapeLancementHtml: string,
  etapeAnalyseHtml: string,
  etapeSuiviHtml: string,
  titre: string,
  debut: string,
  fin: string,
  porteur: string,
  lienSite: string,
  conditionParticipation: string,
  modaliteParticipation: string,
  objectif: string,
  thematique: Thematique,
  illustrationUrl: string,
  etape: string,
  anneeDeLancement: string,
  statut: string,
}
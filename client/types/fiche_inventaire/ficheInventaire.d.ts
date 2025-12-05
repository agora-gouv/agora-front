import ThematiqueApiDTO from "~/client/types/thematique/thematique";

interface FicheInventaireApiDTO {
  id: string,
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
  thematique: ThematiqueApiDTO,
  illustrationUrl: string,
  etape: string,
  anneeDeLancement: string,
  type: string,
}
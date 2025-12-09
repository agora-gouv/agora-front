import ThematiqueApiDTO from "~/client/types/thematique/thematique";
import {FicheInventaireDTO} from "./ficheInventaire";

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
  conditionParticipation: FicheInventaireDTO.Condition,
  modaliteParticipation: FicheInventaireDTO.Modalite,
  thematique: ThematiqueApiDTO,
  illustrationUrl: string,
  etape: FicheInventaireDTO.Etape,
  anneeDeLancement: string,
  type: string,
}


export namespace FicheInventaireDTO {
  export enum Etape{
    ResultatAVenir = "Résultats à venir",
    ResultatDispo = "Résultats disponibles",
    Actions = "Actions",
    EnCours = "En cours",
    AVenir = "À venir"
  }
  export enum Modalite {
    Remote = "En ligne",
    Local = "En présentiel"
  }
  export enum Condition {
    Ouvert = "Ouvert à tous",
    Tirage = "Tirage au sort représentatif",
  }
}
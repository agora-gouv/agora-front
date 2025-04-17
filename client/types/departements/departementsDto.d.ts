interface DepartementDto {
  codePostal: string,
  label: string,
}

interface RegionDto {
  region: string,
  departements: Array<DepartementDto>
}

export interface DepartementsDto {
  regions: Array<RegionDto>
  pays: Array<string>
}
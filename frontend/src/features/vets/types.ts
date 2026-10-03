// Mirrors the Vet and Specialty schemas in openapi.yml.

export interface Specialty {
  id: number
  name: string
}

export interface Vet {
  id: number
  firstName: string
  lastName: string
  specialties: Specialty[]
}

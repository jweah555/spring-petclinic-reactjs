// Mirrors the Owner, Pet, PetType and Visit schemas in the backend's openapi.yml.

export interface PetType {
  id: number
  name: string
}

export interface Visit {
  id: number
  petId: number
  date: string
  description: string
}

export interface Pet {
  id: number
  ownerId: number
  name: string
  birthDate: string
  type: PetType
  visits: Visit[]
}

export interface Owner {
  id: number
  firstName: string
  lastName: string
  address: string
  city: string
  telephone: string
  pets: Pet[]
}

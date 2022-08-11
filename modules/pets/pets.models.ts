export enum Species {
  CAT = 'CAT',
  DOG = 'DOG',
}

export interface IPetModel {
  name: string
  owner: string
  species: string
}

export interface PetModel {
  id: string
  name: string
  owner: string
  species: string
}

export interface AddPetBody {
  name: string
  owner: string
  species: string
}

export interface NewPet {
  name: string
  owner: string
  species: string
}

export interface goodInterace{
  name: string
  familyName: string
}
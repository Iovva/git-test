// This file will contain all the logic of the routes

import PetsDal from './pets.dal'
import { AddPetBody, Species, PetModel, IPetModel } from './pets.models'
import { ControllerError, ControllerResponse, ResponseFactory } from '../../toolkit'

export default class PetsService {
  public static async getPetsList(): Promise<ControllerResponse<IPetModel[] | ControllerError>> {
    const pets = await PetsDal.getPetsList()
    return ResponseFactory.createResponse(pets)
  }

  public static async getPetById(petId: string): Promise<ControllerResponse<IPetModel | ControllerError>> {
    const pet = await PetsDal.getPetById(petId)
    if (!pet) {
      return ResponseFactory.createNotFoundError()
    }
    return ResponseFactory.createResponse(pet)
  }

  public static async addPet(petDetails: AddPetBody): Promise<ControllerResponse<IPetModel | ControllerError>> {
    const { name, owner, species } = petDetails

        
    // one pet per owner!!!!
    const existingPet = await PetsDal.getPetByOwner(owner)
    if (existingPet) {
      return ResponseFactory.createBadRequestError('A pet with this owner already exists')
    }


    const newPet = await PetsDal.addNewPet({ name, owner, species})

    if (newPet) {
      return ResponseFactory.createResponse(newPet)
    }

    return ResponseFactory.createInternalServerError()
  }

  public static async deletePet(petId: string): Promise<ControllerResponse<IPetModel | ControllerError>> {
    const pet = await PetsDal.deletePet(petId)
    if (!pet) {
      return ResponseFactory.createNotFoundError()
    }
    return ResponseFactory.createResponse(pet)
  }

  public static async patchPet(petDetails: AddPetBody, petId: string): Promise<ControllerResponse<IPetModel | ControllerError>> {
    const { name, owner, species } = petDetails

    const newPet = await PetsDal.patchPet({ name, owner, species}, petId)

    if (newPet) {
      return ResponseFactory.createResponse(newPet)
    }

    return ResponseFactory.createInternalServerError()
  }

  public static async loginPet(petDetails: AddPetBody): Promise<ControllerResponse<IPetModel | ControllerError>> {
    const { name, owner, species } = petDetails


    const newPet = await PetsDal.loginPet({ name, owner, species})

    if (newPet) {
      return ResponseFactory.createResponse(newPet)
    }

    return ResponseFactory.createInternalServerError()
  }

  public static async regiterPet(petDetails: AddPetBody): Promise<ControllerResponse<IPetModel | ControllerError>> {
    const { name, owner, species } = petDetails

    // one pet per owner!!!!
    const existingPet = await PetsDal.getPetByOwner(owner)
    if (existingPet) {
      return ResponseFactory.createBadRequestError('A pet with this owner already exists')
    }

    const newPet = await PetsDal.registerPet({ name, owner, species})

    if (newPet) {
      return ResponseFactory.createResponse(newPet)
    }

    return ResponseFactory.createInternalServerError()
  }
}

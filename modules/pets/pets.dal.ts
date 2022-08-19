// Data Access Layer for the Pets
// This will contain all the database queries

import crypto from "crypto";
import { NewPet, Species, PetModel, IPetModel } from "./pets.models";
import { ExceptionSafe, dalExceptionHandler } from "../../toolkit";
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// Mocked Data

const Pets = [
  {
    id: "8D31B96A-02AC-4531-976F-A455686F8FE2",
    name: "azorel",
    owner: "marcel",
    species: "cat"
  },
  {
    id: "123e4567-e89b-12d3-a456-426655440000",
    name: "fanel",
    owner: "tot marcel",
    species: "dog",
  },
];


const Schema = mongoose.Schema;
const petsDataSchema = new Schema<IPetModel>({
  name: String,
  owner: String,
  species: String
});

const PetsData = mongoose.model('pet', petsDataSchema);

const saltRounds = 10;

@ExceptionSafe(dalExceptionHandler)
export default class PetsDal {


  public static async getPetsList(): Promise<IPetModel[]> {
    const pets = await  PetsData.find({});
    console.log(pets);

    return pets
  }

  public static async getPetById(petId: string): Promise<IPetModel | null> {
    const pet = await  PetsData.findOne({_id: petId});
    return pet || null;
  }

  public static async getPetByOwner(ownerFind: string): Promise<IPetModel | null> {
    const pet = await  PetsData.findOne({owner: ownerFind});
    return pet || null;
  }

  public static async addNewPet(petDetails: IPetModel): Promise<IPetModel | null> {
    const pet = new PetsData(petDetails)
    const result = await pet.save();
    return result;
  }

  public static async deletePet(petId: string): Promise<IPetModel | null> {
    const pet = await this.getPetById(petId);
    if (pet){
      await PetsData.deleteOne({_id: petId});
      return pet;
    }
    return null;
  }

  public static async patchPet(petDetails: IPetModel, petId: string): Promise<IPetModel | null> {
    const pet = await PetsData.findOne({_id: petId});
    if (pet){
      Object.assign(pet, petDetails);
      pet.save();
      return pet;
    }
    return null
  }

  public static async loginPet(petDetails: IPetModel): Promise<IPetModel | null> {
    const petInDatabase = await PetsData.findOne({owner: petDetails.owner});
    let result = false;
    if (petInDatabase) 
      result = await bcrypt.compare(petDetails.species, petInDatabase.species);
    if (result === true)
      return petDetails;
    return null;
  }

  public static async registerPet(petDetails: IPetModel): Promise<IPetModel | null> {
    let result;
    try {
      const hash = await bcrypt.hash(petDetails.species, saltRounds);
      petDetails.species = hash;
      const pet = new PetsData(petDetails)
      result = await pet.save();

      return result;
    } catch (Error){
      return null;
    }
  }
}

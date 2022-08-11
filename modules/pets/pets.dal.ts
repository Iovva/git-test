// Data Access Layer for the Pets
// This will contain all the database queries

import crypto from "crypto";
import { NewPet, Species, PetModel, IPetModel } from "./pets.models";
import { ExceptionSafe, dalExceptionHandler } from "../../toolkit";
import mongoose from 'mongoose'

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

mongoose.connect('mongodb://127.0.0.1/db').then(() => console.log("Connected to the database!"));

const Schema = mongoose.Schema;
const petsDataSchema = new Schema<IPetModel>({
  name: String,
  owner: String,
  species: String
});

const PetsData = mongoose.model('pet', petsDataSchema);


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
}

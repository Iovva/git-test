// The Controller files will mostly be used for:
// - getting the Request, Body and Path parameters and passing them to the service
// - validating those parameters
// - Generating the Swagger Documentation

import { Request, Response, Tags, Route, Get, Post, Body, Path, Delete, Patch } from 'tsoa'
import { Request as ExpressRequest } from 'express'
import {
  ControllerResponse,
  ControllerError,
  ExceptionSafe,
  controllerExceptionHandler,
  ErrorMessageCode,
} from '../../toolkit'
import { AddPetBody, PetModel, IPetModel } from './pets.models'
import PetsService from './pets.service'

@Tags('Pets')
@Route('pets')
@ExceptionSafe(controllerExceptionHandler) // Wraps every method in a try-catch that returns a server error
export default class PetsController {
  @Get('/')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async getPets(
    @Request() _request: ExpressRequest
  ): Promise<ControllerResponse<IPetModel[] | ControllerError>> {
    return await PetsService.getPetsList()
  }

  @Get('/{petId}')
  @Response<{ message: ErrorMessageCode.NOT_FOUND }>(404, 'Not Found')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async getPetById(
    @Request() _request: ExpressRequest,
    @Path() petId: string
  ): Promise<ControllerResponse<IPetModel | ControllerError>> {
    return await PetsService.getPetById(petId)
  }

  @Post('/')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async addPet(
    @Request() _request: ExpressRequest,
    @Body() petDetails: AddPetBody
  ): Promise<ControllerResponse<IPetModel | ControllerError>> {
    return await PetsService.addPet(petDetails)
  }

  @Delete('/{petId}')
  @Response<{ message: ErrorMessageCode.NOT_FOUND }>(404, 'Not Found')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async deletePet(
    @Request() _request: ExpressRequest,
    @Path() petId: string
  ): Promise<ControllerResponse<IPetModel | ControllerError>> {
    return await PetsService.deletePet(petId)
  }

  @Patch('/{petId}')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async patchPet(
    @Request() _request: ExpressRequest,
    @Body() petDetails: AddPetBody,
    @Path() petId: string
  ): Promise<ControllerResponse<IPetModel | ControllerError>> {
    return await PetsService.patchPet(petDetails, petId)
  }

  @Post('/login')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async loginPet(
    @Request() _request: ExpressRequest,
    @Body() petDetails: AddPetBody
  ): Promise<ControllerResponse<IPetModel | ControllerError>> {
    return await PetsService.loginPet(petDetails)
  }

  @Post('/register')
  @Response<{ message: ErrorMessageCode.BAD_REQUEST }>(400, 'Bad Request')
  @Response<{ message: ErrorMessageCode.INTERNAL_SERVER_ERROR }>(500, 'Server Error')
  public static async registerPet(
    @Request() _request: ExpressRequest,
    @Body() petDetails: AddPetBody
  ): Promise<ControllerResponse<IPetModel | ControllerError>> {
    return await PetsService.regiterPet(petDetails)
  }
}

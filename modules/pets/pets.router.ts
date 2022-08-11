import { Router, Request, Response } from 'express'
import PetsController from './pets.controller'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const { statusCode, body } = await PetsController.getPets(req)
  console.log("AMAZING FEATURE!!!")
  res.status(statusCode).send(body)
})

router.get('/:petId', async (req: Request, res: Response) => {
  const { petId } = req.params
  const { statusCode, body } = await PetsController.getPetById(req, petId)
  res.status(statusCode).send(body)
})

router.post('/', async (req: Request, res: Response) => {
  const { statusCode, body } = await PetsController.addPet(req, req.body)
  res.status(statusCode).send(body)
})

router.delete('/:petId', async (req: Request, res: Response) => {
  const { petId } = req.params
  const { statusCode, body } = await PetsController.deletePet(req, petId)
  res.status(statusCode).send(body)
})

router.patch('/:petId', async (req: Request, res: Response) => {
  const { petId } = req.params
  const { statusCode, body } = await PetsController.patchPet(req, req.body, petId)
  res.status(statusCode).send(body)
})

export default router

/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Age, Energy, Independency, Pet, Size, Type } from '@prisma/client'
import { IPetsRepository } from '@/repositories/interfaces/interface-pets-repository'
import { IRestrictionsRepository } from '@/repositories/interfaces/interface-restrictions-repository'

interface UseCaseRequest {
  name: string
  type: Type
  age: Age
  energy: Energy
  size: Size
  independency: Independency
  org_id: string
  restrictions_list: string[]
}

interface UseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private PetsRepository: IPetsRepository,
    private RestrictionsRepository: IRestrictionsRepository,
  ) {}

  async execute({
    name,
    type,
    age,
    energy,
    size,
    independency,
    org_id,
    restrictions_list,
  }: UseCaseRequest): Promise<UseCaseResponse> {
    const pet = await this.PetsRepository.create({
      name,
      type,
      age,
      energy,
      size,
      independency,
      org_id,
    })

    const restriction_list_final = restrictions_list.map((obj) => {
      return {
        restriction: obj,
        pet_id: pet.id,
      }
    })

    await this.RestrictionsRepository.createMany({
      data: restriction_list_final,
    })

    return { pet }
  }
}

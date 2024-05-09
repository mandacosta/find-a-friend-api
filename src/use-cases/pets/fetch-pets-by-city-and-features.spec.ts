/* eslint-disable camelcase */
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryRestrictionsRepository } from '../../repositories/in-memory/in-memory-restrictions-repository'
import { CreatePetUseCase, PetCreationUseCaseRequest } from './create-pet'
import { RegisterOrgUseCase } from '../orgs/register-org'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityAndFeaturesUseCase } from './fetch-pets-by-city-and-features'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let restrictionsRepository: InMemoryRestrictionsRepository

let createOrgUseCase: RegisterOrgUseCase
let createPetUseCase: CreatePetUseCase
let sut: FetchPetsByCityAndFeaturesUseCase

describe('Fetch Pets By City And Features', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    restrictionsRepository = new InMemoryRestrictionsRepository()
    createOrgUseCase = new RegisterOrgUseCase(orgsRepository)
    createPetUseCase = new CreatePetUseCase(
      petsRepository,
      restrictionsRepository,
    )
    sut = new FetchPetsByCityAndFeaturesUseCase(petsRepository)
  })
  it('should find pets by city and features', async () => {
    const org_1_ = {
      address: 'Avenida Atlântica',
      email: 'copalegal@gmail.com',
      name: 'Copa Legal',
      password: '12345',
      whatsapp_phone: '5511991988357',
      zipcode: '22021001',
      additional_info: 'Casa A',
    }

    const org_2_ = {
      address: 'Rua Giovanni Legrenzi, 45',
      email: 'amigosdobem@gmail.com',
      name: 'Amigos do Bem',
      password: '12345',
      whatsapp_phone: '5511991988357',
      zipcode: '08225270',
      additional_info: 'Casa A',
    }

    const { org: org_1 } = await createOrgUseCase.execute(org_1_)
    const { org: org_2 } = await createOrgUseCase.execute(org_2_)
    console.log('org_2', org_2)

    const pet_1_: PetCreationUseCaseRequest = {
      name: 'Boris',
      type: 'CAT',
      age: 'PUPPY',
      energy: 'TWO',
      size: 'SMALL',
      independency: 'THREE',
      org_id: org_1.id,
      restrictions_list: ['Feels insecure around other cats', 'Likes dogs'],
    }

    const pet_2_: PetCreationUseCaseRequest = {
      name: 'Nina',
      type: 'DOG',
      age: 'GROWNUP',
      energy: 'THREE',
      size: 'MEDIUM',
      independency: 'TWO',
      org_id: org_2.id,
      restrictions_list: [
        'Feels insecure around other dogs',
        'She is afraid of the rain',
        'Likes humans',
      ],
    }

    const pet_3_: PetCreationUseCaseRequest = {
      name: 'Boris2',
      type: 'DOG',
      age: 'PUPPY',
      energy: 'TWO',
      size: 'SMALL',
      independency: 'THREE',
      org_id: org_2.id,
      restrictions_list: ['Feels insecure around other cats', 'Likes dogs'],
    }

    await createPetUseCase.execute(pet_1_)
    await createPetUseCase.execute(pet_2_)
    await createPetUseCase.execute(pet_3_)

    const { pets } = await sut.execute({
      city: 'São Paulo',
      filters: {
        size: 'MEDIUM',
        independency: 'TWO',
      },
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Nina')
  })
})

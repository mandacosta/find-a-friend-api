import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryRestrictionsRepository } from '../../repositories/in-memory/in-memory-restrictions-repository'
import { CreatePetUseCase, PetCreationUseCaseRequest } from './create-pet'
import { RegisterOrgUseCase } from '../orgs/register-org'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let restrictionsRepository: InMemoryRestrictionsRepository
let createOrgUseCase: RegisterOrgUseCase
let sut: CreatePetUseCase

describe('Create new Pet', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    restrictionsRepository = new InMemoryRestrictionsRepository()
    createOrgUseCase = new RegisterOrgUseCase(orgsRepository)
    sut = new CreatePetUseCase(petsRepository, restrictionsRepository)
  })
  it('should create a new Pet', async () => {
    const org_ = {
      address: 'Rua Giovanni Legrenzi, 45',
      email: 'amigosdobem@gmail.com',
      name: 'Amigos do Bem',
      password: '12345',
      whatsapp_phone: '5511991988357',
      zipcode: '08225270',
      additional_info: 'Casa A',
    }

    const { org } = await createOrgUseCase.execute(org_)

    const pet_: PetCreationUseCaseRequest = {
      name: 'Nina',
      type: 'DOG',
      age: 'GROWNUP',
      energy: 'THREE',
      size: 'MEDIUM',
      independency: 'TWO',
      org_id: org.id,
      restrictions_list: [
        'Feels insecure around other dogs',
        'She is afraid of the rain',
        'Likes humans',
      ],
    }

    const { pet } = await sut.execute(pet_)

    // Validar se o pet tem id
    expect(pet.id).toEqual(expect.any(String))

    // Validar se as restrições foram criadas
    const restrictions = await restrictionsRepository.findMany(pet.id)
    expect(restrictions).toHaveLength(3)

    const restriction = restrictions.filter(
      (obj) => obj.restriction === 'Likes humans',
    )
    expect(restriction).toHaveLength(1)
  })
})

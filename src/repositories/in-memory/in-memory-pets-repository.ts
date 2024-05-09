/* eslint-disable camelcase */
import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../interfaces/interface-pets-repository'
import { randomUUID } from 'crypto'
import { IOrgsRepository } from '../interfaces/interface-orgs-repository'

export class InMemoryPetsRepository implements IPetsRepository {
  public repository: Pet[] = []
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      org_id: data.org_id,
      age: data.age ?? 'GROWNUP',
      energy: data.energy ?? 'THREE',
      independency: data.independency ?? 'TWO',
      size: data.size ?? 'MEDIUM',
      type: data.type ?? 'DOG',
    }
    this.repository.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.repository.find((pet) => pet.id === id)
    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(
    city: string,
    filters: Record<string, string>,
    page: number,
  ) {
    const orgsFromCity = await this.orgsRepository.filterOrgsByCity(city)
    const orgsIdFromCity = orgsFromCity.map((org) => org.id)

    return this.repository
      .filter((pet) => {
        let good = true

        // Valida a cidade do Pet
        if (!orgsIdFromCity.includes(pet.org_id)) {
          return false
        }

        // Valida as características do Pet
        for (const key in filters) {
          if (pet[key as keyof Pet] !== filters[key]) {
            good = false
          }
        }

        return good
      })
      .slice((page - 1) * 20, page * 20)
  }
}

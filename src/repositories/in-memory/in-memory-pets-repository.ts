/* eslint-disable camelcase */
import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../interfaces/interface-pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public repository: Pet[] = []
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

  async searchMany(city: string, query: string, page: number) {
    const string = 'energy=TWO&age=PUPPY&size=MEDIUM'
    const filters = string.split('&')
    const pairs = filters.reduce((acc, act) => {
      const key_value = act.split('=')
      const key = key_value[0]
      const value = key_value[1]
      acc[key] = value
      return acc
    }, {})
    console.log(pairs)
    return this.repository
      .filter((pet) => {
        let good = true
        for (const key in pairs) {
          if (pairs[key] !== pet[key]) {
            good = false
          }
        }
      })
      .slice((page - 1) * 20, page * 20)
  }
}

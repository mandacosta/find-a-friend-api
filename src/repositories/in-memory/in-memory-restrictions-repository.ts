/* eslint-disable camelcase */
import { Prisma, Restriction } from '@prisma/client'
import { IRestrictionsRepository } from '../interfaces/interface-restrictions-repository'
import { randomUUID } from 'crypto'

export class InMemoryRestrictionsRepository implements IRestrictionsRepository {
  public repository: Restriction[] = []
  async createMany(data: Prisma.RestrictionCreateManyInput[]) {
    const dataWithId = data.map((obj) => {
      return {
        id: randomUUID(),
        ...obj,
      }
    })

    this.repository = [...this.repository, ...dataWithId]
  }

  async findMany(pet_id: string) {
    const restrictions = this.repository.filter((obj) => obj.pet_id === pet_id)

    return restrictions
  }
}

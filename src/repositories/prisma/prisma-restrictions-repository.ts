/* eslint-disable camelcase */
import { Prisma } from '@prisma/client'
import { IRestrictionsRepository } from '../interfaces/interface-restrictions-repository'
import { prisma } from '@/libs/prisma'

export class PrismaRestrictionsRepository implements IRestrictionsRepository {
  async createMany(data: Prisma.RestrictionCreateManyInput[]) {
    await prisma.restriction.createMany({
      data,
    })
  }

  async findMany(pet_id: string) {
    const restrictions = await prisma.restriction.findMany({
      where: {
        pet_id,
      },
    })

    return restrictions
  }
}

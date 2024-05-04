import { prisma } from '@/libs/prisma'
import { IOrgsRepository } from '../interfaces/interface-orgs-repository'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements IOrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async filterOrgsByCity(city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return orgs
  }
}

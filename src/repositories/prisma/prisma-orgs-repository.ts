import { prisma } from '@/libs/prisma'
import { IOrgsRepository } from '../interfaces/interface-orgs-repository'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements IOrgsRepository {
  // async findById(id: string) {
  //   throw new Error('Method not implemented.')
  // }

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
}

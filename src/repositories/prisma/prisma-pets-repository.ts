import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import { IPetsRepository } from '../interfaces/interface-pets-repository'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany(
    city: string,
    filters: Record<string, string>,
    page: number,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city,
        },
        ...filters,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}

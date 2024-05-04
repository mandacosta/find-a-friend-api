import { Restriction, Prisma } from '@prisma/client'

export interface IRestrictionsRepository {
  createMany(data: Prisma.RestrictionCreateManyInput[]): Promise<void>
  findMany(pet_id: string): Promise<Restriction[] | []>
}

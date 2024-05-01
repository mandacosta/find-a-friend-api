import { Restriction, Prisma } from '@prisma/client'

export interface IRestrictionsRepository {
  createMany(data: Prisma.RestrictionCreateManyArgs): Promise<Restriction[]>
  findMany(pet_id: string): Promise<Restriction[] | []>
}

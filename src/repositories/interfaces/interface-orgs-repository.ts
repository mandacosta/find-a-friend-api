import { Org, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>
  // findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}

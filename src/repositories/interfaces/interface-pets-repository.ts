import { Pet, Prisma } from '@prisma/client'

export interface IPetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(city: string, query: string, page: number): Promise<Pet[] | []>
}

import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  searchMany(
    city: string,
    filters: Record<string, string>,
    page: number,
  ): Promise<Pet[] | []>
}

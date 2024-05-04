/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/interfaces/interface-pets-repository'

interface UseCaseRequest {
  city: string
  filters: Record<string, string>
  page: number
}

interface UseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityAndFeaturesUseCase {
  constructor(private PetsRepository: IPetsRepository) {}

  async execute({
    city,
    filters,
    page,
  }: UseCaseRequest): Promise<UseCaseResponse> {
    const pets = await this.PetsRepository.searchMany(city, filters, page)

    return { pets }
  }
}

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
    const cityNormalized = city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
    const pets = await this.PetsRepository.searchMany(
      cityNormalized,
      filters,
      page,
    )

    return { pets }
  }
}

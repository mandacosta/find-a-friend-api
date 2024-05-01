/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { hash } from 'bcryptjs'
import { IOrgsRepository } from '@/repositories/interfaces/interface-orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { getInfosFromCEP } from '../../utils/get-infos-from-cep'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface RegisterOrgUseCaseRequest {
  address: string
  email: string
  name: string
  password: string
  whatsapp_phone: string
  zipcode: string
  additional_info: string | null
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private OrgsRepository: IOrgsRepository) {}

  async execute({
    address,
    email,
    name,
    password,
    whatsapp_phone,
    zipcode,
    additional_info,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await this.OrgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }
    const password_hash = await hash(password, 6)

    const infos = await getInfosFromCEP(zipcode)

    if (!infos) {
      throw new ResourceNotFoundError()
    }

    const { city, state } = infos

    const cityNormalized = city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()

    const org = await this.OrgsRepository.create({
      address,
      city: cityNormalized,
      email,
      name,
      password_hash,
      state,
      whatsapp_phone,
      zipcode,
      additional_info,
    })
    return { org }
  }
}

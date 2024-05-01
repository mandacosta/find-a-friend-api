/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { hash } from 'bcryptjs'
import { IOrgsRepository } from '@/repositories/interfaces/interface-orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  address: string
  city: string
  email: string
  name: string
  number: string
  password: string
  state: string
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
    city,
    email,
    name,
    number,
    password,
    state,
    whatsapp_phone,
    zipcode,
    additional_info,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await this.OrgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }
    const password_hash = await hash(password, 6)
    const cityNormalized = city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()

    const org = await this.OrgsRepository.create({
      address,
      city: cityNormalized,
      email,
      name,
      number,
      password_hash,
      state,
      whatsapp_phone,
      zipcode,
      additional_info,
    })
    return { org }
  }
}

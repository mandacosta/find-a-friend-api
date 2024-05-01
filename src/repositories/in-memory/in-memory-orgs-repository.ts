/* eslint-disable camelcase */
import { Org, Prisma } from '@prisma/client'
import { IOrgsRepository } from '../interfaces/interface-orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public repository: Org[] = []
  async create(data: Prisma.OrgCreateInput) {
    const {
      address,
      city,
      email,
      name,
      number,
      password_hash,
      state,
      whatsapp_phone,
      zipcode,
    } = data
    const org = {
      id: data.id ?? randomUUID(),
      name,
      email,
      zipcode,
      state,
      city,
      address,
      number,
      additional_info: data.additional_info ?? null,
      password_hash,
      whatsapp_phone,
    }

    this.repository.push(org)

    return org
  }

  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    throw new Error('Method not implemented.')
  }
}

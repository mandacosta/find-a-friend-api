import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register new Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })
  it('should properly hash passoword', async () => {
    const org_ = {
      address: 'Rua Giovanni Legrenzi',
      city: 'São Paulo',
      email: 'amigosdobem@gmail.com',
      name: 'Amigos do Bem',
      number: '607',
      password: '12345',
      state: 'SP',
      whatsapp_phone: '5511991988357',
      zipcode: '08225270',
      additional_info: 'Casa A',
    }

    const { org } = await sut.execute(org_)
    const isPasswordProperlyHashed = await compare(
      org_.password,
      org.password_hash,
    )

    expect(isPasswordProperlyHashed).toBe(true)
  })

  it('should not allow email duplicity', async () => {
    const org_ = {
      address: 'Rua Giovanni Legrenzi',
      city: 'São Paulo',
      email: 'amigosdobem@gmail.com',
      name: 'Amigos do Bem',
      number: '607',
      password: '12345',
      state: 'SP',
      whatsapp_phone: '5511991988357',
      zipcode: '08225270',
      additional_info: 'Casa A',
    }

    await sut.execute(org_)

    await expect(() => sut.execute(org_)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError,
    )
  })

  it('should register a new Org', async () => {
    const org_ = {
      address: 'Rua Giovanni Legrenzi',
      city: 'São Paulo',
      email: 'amigosdobem@gmail.com',
      name: 'Amigos do Bem',
      number: '607',
      password: '12345',
      state: 'SP',
      whatsapp_phone: '5511991988357',
      zipcode: '08225270',
      additional_info: 'Casa A',
    }

    const { org } = await sut.execute(org_)
    expect(org.id).toEqual(expect.any(String))
  })
})

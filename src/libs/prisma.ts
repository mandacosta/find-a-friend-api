import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// A criação desse arquivo facilita porque ele já é exportado instanciado

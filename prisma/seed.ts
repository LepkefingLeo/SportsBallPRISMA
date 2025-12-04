import { PrismaClient } from '../generated/prisma/client'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()
async function main() {
  await prisma.$transaction(async tx => {
    for (let i = 0; i < 3; i++) {
      const team = await tx.team.create({
        data: {
          country: faker.location.country(),
        },
      })
      for (let j = 0; j < 11; j++) {
        await tx.player.create({
          data: {
            name: faker.person.fullName(),
            goalCount: faker.number.int({ min: 0, max: 20 }),
            birthDate: faker.date.birthdate({ mode: 'year', min: 1980, max: 2000 }),
            team: {
              connect: { id: team.id }
            }
          },
        })
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

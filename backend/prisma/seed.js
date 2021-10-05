const { PrismaClient } = require('@prisma/client')
const faker = require("faker");
const { generateProductData } = require('./data/products');
const { generateUserData } = require('./data/users');

const prisma = new PrismaClient()


const productData = generateProductData()

async function main() {


  await prisma.product.create({
    data: productData,
  })

  for (const userData of generateUserData(50)) {
    await prisma.user.create({
      data: {
        reviews: {
          create: {
            productId: productData.id,
            id: faker.datatype.uuid(),
            rating: faker.datatype.number({ min: 1, max: 5 }),
            text: faker.lorem.sentence(faker.datatype.number({ min: 7, max: 12 })),
          }
        },
        ...userData
      }
    })
    console.log("created user ", userData)

  }


  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

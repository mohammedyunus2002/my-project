import { PrismaClient } from './prisma/generated/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: 'hashed_password',
        name: 'John Doe',
      },
    })
    console.log('Created user:', newUser)

    // Create a new product
    const newProduct = await prisma.product.create({
      data: {
        name: 'Example Product',
        description: 'A sample product',
        price: 19.99,
        image: 'product.jpg',
        stock: 100,
      },
    })
    console.log('Created product:', newProduct)

    // Create a new order
    const newOrder = await prisma.order.create({
      data: {
        userId: newUser.id,
        products: {
          connect: [{ id: newProduct.id }],
        },
      },
    })
    console.log('Created order:', newOrder)

    // Fetch a user and their orders
    const userWithOrders = await prisma.user.findUnique({
      where: { id: newUser.id },
      include: { orders: true },
    })
    console.log('User with orders:', userWithOrders)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
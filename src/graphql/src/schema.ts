import gql from 'graphql-tag';
import { PrismaClient } from '../../prisma/prisma/generated/client/index.js';

const prisma = new PrismaClient();

export const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    name: String!
    orders: [Order]!
  }

  type Product {
    id: Int!
    name: String!
    description: String!
    price: Float!
    image: String!
    stock: Int!
    orders: [Order]!
  }

  type Order {
    id: Int!
    createdAt: String!
    userId: Int!
    user: User!
    products: [Product]!
  }

  type Query {
    users: [User]!
    user(id: Int!): User
    products: [Product]!
    product(id: Int!): Product
    orders: [Order]!
    order(id: Int!): Order
  }

  type Mutation {
    createUser(email: String!, password: String!, name: String!): User!
    createProduct(name: String!, description: String, price: Float!, image: String!, stock: Int!): Product!
    createOrder(userId: Int!, productIds: [Int!]!): Order!
  }
`;

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }: { id: number }) => prisma.user.findUnique({ where: { id } }),
    products: () => prisma.product.findMany(),
    product: (_, { id }: { id: number }) => prisma.product.findUnique({ where: { id } }),
    orders: () => prisma.order.findMany(),
    order: (_, { id }: { id: number }) => prisma.order.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { email, password, name }: { email: string; password: string; name: string }) =>
      prisma.user.create({ data: { email, password, name } }),
    createProduct: (
      _,
      { name, description, price, image, stock }: { name: string; description?: string; price: number; image: string; stock: number }
    ) => prisma.product.create({ data: { name, description, price, image, stock } }),
    createOrder: (_, { userId, productIds }: { userId: number; productIds: number[] }) => {
      const products = productIds.map((productId) => ({ id: productId }));
      return prisma.order.create({
        data: {
          userId,
          products: { connect: products },
        },
      });
    },
  },
  User: {
    orders: (user: { id: number }) => prisma.order.findMany({ where: { userId: user.id } }),
  },
  Product: {
    orders: (product: { id: number }) => 
      prisma.order.findMany({where: { products: { some: { id: product.id } } }}),
  },
  Order: {
    user: (order: { userId: number }) =>
      prisma.user.findUnique({ where: { id: order.userId } }),
    products: (order: { id: number }) =>
      prisma.product.findMany({ where: { orders: { some: { id: order.id } } }}),
  },
};


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const generateToken = (userId) => {
    const secret = 'your-secret-key';
    const expiresIn = '1h';
    const token = jwt.sign({ userId }, secret, { expiresIn });
    return token;
};
export const resolvers = {
    Query: {
        getUser: async (_, { id }, context) => prisma.user.findUnique({ where: { id } }),
        getAllUsers: async (_, __, context) => prisma.user.findMany(),
        getProduct: async (_, { id }, context) => prisma.product.findUnique({ where: { id } }),
        getAllProducts: async (_, __, context) => prisma.product.findMany(),
        getCart: async (_, { userId }, context) => prisma.cart.findUnique({
            where: { userId },
            include: {
                products: true, // Include the associated products
            },
        }),
        login: async (_, { username, password }, context) => {
            const user = await prisma.user.findUnique({ where: { username } });
            if (!user) {
                throw new Error("User not found");
            }
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                throw new Error("Invalid password");
            }
            const token = generateToken(user.id);
            return { user, token };
        },
    },
    Mutation: {
        createUser: async (_, { username, email, password }, context) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({ data: { username, email, password: hashedPassword } });
            return { user };
        },
        createProduct: async (_, { name, price, image, type }, context) => prisma.product.create({ data: { name, price, image, type } }),
        createCart: async (_, { userId }, context) => prisma.cart.create({ data: { userId } }),
        addToCart: async (_, { cartId, productId }, context) => {
            try {
                const updatedCart = await prisma.cart.update({
                    where: { id: cartId },
                    data: { products: { connect: { id: productId } } },
                    include: { products: true },
                });
                return updatedCart;
            }
            catch (error) {
                console.error('Error adding product to cart:', error);
                throw new Error('Failed to add product to cart');
            }
        },
        updateProduct: async (_, { id, name, price, image, type }, context) => {
            const updatedProduct = await prisma.product.update({
                where: { id },
                data: { name, price, image, type },
            });
            return updatedProduct;
        },
        deleteProduct: async (_, { id }, context) => {
            const deletedProduct = await prisma.product.delete({
                where: { id },
            });
            return deletedProduct;
        },
    },
    User: {
        cart: async (parent, _, context) => prisma.cart.findUnique({ where: { userId: parent.id } }),
    },
    Product: {
        carts: async (parent, _, context) => prisma.cart.findMany({ where: { products: { some: { id: parent.id } } } }),
    },
    Cart: {
        user: async (parent, _, context) => prisma.user.findUnique({ where: { id: parent.userId } }),
    },
};
export default resolvers;

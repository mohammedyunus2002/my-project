export const typeDefs = `
  type Query {
    getUser(id: Int!): User
    getAllUsers: [User]
    getProduct(id: Int!): Product
    getAllProducts: [Product]
    getCart(userId: Int!): Cart
    login(username: String!, password: String!): LoginResponse!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createProduct(name: String!, price: Float!, image: String!, type: String!): Product
    updateProduct(id: Int!, name: String, price: Float, image: String): Product
    deleteProduct(id: Int!): Product
    createCart(userId: Int!): Cart
    addToCart(cartId: Int!, productId: Int!): Cart
  }

  type User {
    id: Int
    username: String
    email: String
    password: String
    cart: Cart
  }

  type Product {
    id: Int
    name: String
    price: Float
    image: String
    type: String
    carts: [Cart]
  }

  type Cart {
    id: Int
    user: User
    products: [Product]
  }

  type LoginResponse {
    user: User
    token: String
  }
`;

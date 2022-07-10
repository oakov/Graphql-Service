import { gql } from 'apollo-server';

export interface IUserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface IUser extends IUserInput {
  id: string;
}

export const userType = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    middleName: String
    password: String!
    email: String!
  }

  input InputUser {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }

  type JWT {
    jwt: String!
  }

  type Query {
    jwt(email: String!, password: String!): JWT
    user(id: ID!): User
  }

  type Mutation {
    register(user: InputUser!): User
  }
`;

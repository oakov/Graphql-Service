export interface IGenreInput {
  name: string;
  description: string;
  country: string;
  year: number;
}

export interface IGenre extends IGenreInput {
  id: string;
}

import { gql } from 'apollo-server';

export const genreType = gql`
  type Genre {
    id: ID!
    name: String!
    description: String
    country: String
    year: Int
  }

  extend type Query {
    genres(limit: Int, offset: Int): [Genre]
    genre(id: ID!): Genre
  }

  input InputGenre {
    name: String!
    description: String
    country: String
    year: Int
  }

  type Deleted {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Mutation {
    createGenre(genre: InputGenre!): Genre!
    deleteGenre(id: ID!): Deleted
    updateGenre(id: ID!, genre: InputGenre!): Genre!
  }
`;

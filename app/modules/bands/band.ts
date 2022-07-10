export interface IBandInput {
  name: string;
  origin: string;
  members: string[];
  website: string;
  genresIds: string[];
}

export interface IBand extends IBandInput {
  id: string;
}

export interface IMember {
  _id: string;
  artist: string;
  instrument: string;
  years: string[];
}

import { gql } from 'apollo-server';

export const bandType = gql`
  type Band {
    id: ID!
    name: String!
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Member {
    id: ID!
    artist: String
    instrument: String
    years: [String]
  }

  input MemberInput {
    _id: ID
    artist: String
    instrument: String
    years: [String]
  }

  input InputBand {
    name: String!
    origin: String
    members: [MemberInput]
    website: String
    genresIds: [String]
  }

  type Query {
    bands(limit: Int, offset: Int): [Band]
    band(id: ID!): Band
  }

  type Mutation {
    createBand(band: InputBand!): Band!
    updateBand(id: ID!, band: InputBand!): Band!
    deleteBand(id: ID!): Deleted
  }
`;

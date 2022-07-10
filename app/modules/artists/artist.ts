export interface IArtistInput {
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
}

export interface IArtist extends IArtistInput {
  id: string;
}

import { gql } from 'apollo-server';

export const artistType = gql`
  type Artist {
    id: ID!
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: String
  }

  type Query {
    artists(limit: Int, offset: Int): [Artist]
    artist(id: ID!): Artist
  }

  input InputArtist {
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    bandsIds: [String]
    country: String
    instruments: [String]
  }

  type Deleted {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Mutation {
    createArtist(artist: InputArtist!): Artist!
    deleteArtist(id: ID!): Deleted
    updateArtist(id: ID!, artist: InputArtist!): Artist!
  }
`;

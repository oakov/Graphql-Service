export interface ITrackInput {
  title: string;
  albumId: string;
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

export interface ITrack extends ITrackInput {
  id: string;
}

import { gql } from 'apollo-server';

export const trackType = gql`
  type Track {
    id: ID!
    title: String!
    albums: [Album]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  extend type Query {
    tracks(limit: Int, offset: Int): [Track]
    track(id: ID!): Track
  }

  input InputTrack {
    title: String!
    albumId: String
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  type Mutation {
    createTrack(track: InputTrack!): Track!
    updateTrack(id: ID!, track: InputTrack): Track!
    deleteTrack(id: ID!): Deleted
  }
`;

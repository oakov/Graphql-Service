export interface IFavouritesInput {
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

export interface IFavourites extends IFavouritesInput {
  id: string;
}

export enum FavouritesField {
  bands = 'bands',
  genres = 'genres',
  artists = 'artists',
  tracks = 'tracks',
}

import { gql } from 'apollo-server';

export const favouritesType = gql`
  type Favourites {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  extend type Query {
    favourites: Favourites
  }

  type Mutation {
    addTrackToFavourites(trackId: ID!): Favourites!
    addBandToFavourites(bandId: ID!): Favourites!
    addArtistToFavourites(artistId: ID!): Favourites!
    addGenreToFavourites(genreId: ID!): Favourites!
    removeTrackToFavourites(trackId: ID!): Favourites!
    removeBandToFavourites(bandId: ID!): Favourites!
    removeArtistToFavourites(artistId: ID!): Favourites!
    removeGenreToFavourites(genreId: ID!): Favourites!
  }
`;

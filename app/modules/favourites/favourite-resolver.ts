import { FavouritesField } from './favourite';

export const favouriteResolver = {
  Query: {
    favourites: async (_, __, { dataSources }) => {
      const res = await dataSources.favouritesData.getAllFavourites();
      return res;
    },
  },
  Mutation: {
    addTrackToFavourites: async (_, { trackId }, { dataSources }) => {
      const res = await dataSources.favouritesData.addToFavourites(
        FavouritesField.tracks,
        trackId
      );
      return res;
    },
    addBandToFavourites: async (_, { bandId }, { dataSources }) => {
      const res = await dataSources.favouritesData.addToFavourites(
        FavouritesField.bands,
        bandId
      );
      return res;
    },
    addArtistToFavourites: async (_, { artistId }, { dataSources }) => {
      const res = await dataSources.favouritesData.addToFavourites(
        FavouritesField.artists,
        artistId
      );
      return res;
    },
    addGenreToFavourites: async (_, { genreId }, { dataSources }) => {
      const res = await dataSources.favouritesData.addToFavourites(
        FavouritesField.genres,
        genreId
      );
      return res;
    },
    removeTrackToFavourites: async (_, { trackId }, { dataSources }) => {
      const res = await dataSources.favouritesData.removeFromFavourites(
        FavouritesField.tracks,
        trackId
      );
      return res;
    },
    removeBandToFavourites: async (_, { bandId }, { dataSources }) => {
      const res = await dataSources.favouritesData.removeFromFavourites(
        FavouritesField.bands,
        bandId
      );
      return res;
    },
    removeArtistToFavourites: async (_, { artistId }, { dataSources }) => {
      const res = await dataSources.favouritesData.removeFromFavourites(
        FavouritesField.artists,
        artistId
      );
      return res;
    },
    removeGenreToFavourites: async (_, { genreId }, { dataSources }) => {
      const res = await dataSources.favouritesData.removeFromFavourites(
        FavouritesField.genres,
        genreId
      );
      return res;
    },
  },
  Favourites: {
    id: (parent) => parent._id,
    artists: async ({ artistsIds }, _, { dataSources }) => {
      const res = await Promise.all(
        artistsIds.map((artistId) =>
          dataSources.artistService.getArtistById(artistId)
        )
      );
      return res;
    },
    bands: async ({ bandsIds }, _, { dataSources }) => {
      const res = await Promise.all(
        bandsIds.map((bandId) => dataSources.bandService.getBandById(bandId))
      );
      return res;
    },
    tracks: async ({ tracksIds }, _, { dataSources }) => {
      const res = await Promise.all(
        tracksIds.map((trackId) => dataSources.trackData.getTrackById(trackId))
      );
      return res;
    },
    genres: async ({ genresIds }, _, { dataSources }) => {
      const res = await Promise.all(
        genresIds.map((genreId) =>
          dataSources.genreService.getGenreById(genreId)
        )
      );
      return res;
    },
  },
};

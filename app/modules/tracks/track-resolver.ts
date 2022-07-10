export const trackResolver = {
  Query: {
    track: async (_, { id }, { dataSources }) => {
      const res = await dataSources.trackData.getTrackById(id);
      return res;
    },
    tracks: async (_, { limit, offset }, { dataSources }) => {
      const res = await dataSources.trackData.getAllTracks(limit, offset);
      return res;
    },
  },
  Mutation: {
    createTrack: async (_, { track }, { dataSources }) => {
      const newTrack = { ...track };
      const res = await dataSources.trackData.createTrack(newTrack);
      return res;
    },
    updateTrack: async (_, { id, track }, { dataSources }) => {
      const newTrack = { ...track };
      const res = await dataSources.trackData.updateTrack(id, newTrack);
      return res;
    },
    deleteTrack: async (_, { id }, { dataSources }) => {
      const res = await dataSources.trackData.deleteTrack(id);
      return res;
    },
  },
  Track: {
    id: (parent) => parent._id,
    bands: async ({ bandsIds }, _, { dataSources }) => {
      const res = await Promise.all(
        bandsIds.map((bandId) => dataSources.bandService.getBandById(bandId))
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
    albums: async ({ albumId }, _, { dataSources }) => {
      if (albumId) {
        const res = await dataSources.albumData.getAlbumById(albumId);
        return [res];
      }
      return [];
    },
  },
};

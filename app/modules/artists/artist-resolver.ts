export const artistResolver = {
  Query: {
    artist: async (_, { id }, { dataSources }) => {
      const res = await dataSources.artistData.getArtistById(id);
      return res;
    },
    artists: async (_, { limit, offset }, { dataSources }) => {
      const res = await dataSources.artistData.getAllArtists(limit, offset);
      return res;
    },
  },
  Mutation: {
    createArtist: async (_, { artist }, { dataSources }) => {
      const newArtist = { ...artist };
      const res = await dataSources.artistData.createArtist(newArtist);
      return res;
    },
    updateArtist: async (_, { id, artist }, { dataSources }) => {
      const newArtist = { ...artist };
      const res = await dataSources.artistData.updateArtist(id, newArtist);
      return res;
    },
    deleteArtist: async (_, { id }, { dataSources }) => {
      const res = await dataSources.artistData.deleteArtist(id);
      return res;
    },
  },
  Artist: {
    id: (parent) => parent._id,
    bands: async ({ bandsIds }, _, { dataSources }) => {
      const res = await Promise.all(
        bandsIds.map((bandId) => dataSources.bandData.getBandById(bandId))
      );
      return res;
    },
  },
};

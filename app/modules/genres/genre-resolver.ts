import { IGenre } from './genre';

export const genreResolver = {
  Query: {
    genre: async (_, { id }, { dataSources }) => {
      const res = await dataSources.genreData.getGenreById(id);
      return res;
    },
    genres: async (
      _,
      { limit, offset },
      { dataSources }
    ): Promise<IGenre[]> => {
      const res = await dataSources.genreData.getAllGenres(limit, offset);
      return res;
    },
  },
  Mutation: {
    createGenre: async (_, { genre }, { dataSources }) => {
      const newGenre = { ...genre };
      const res = await dataSources.genreData.createGenre(newGenre);
      return res;
    },
    updateGenre: async (_, { id, genre }, { dataSources }) => {
      const newGenre = { ...genre };
      const res = await dataSources.genreData.updateGenre(id, newGenre);
      return res;
    },
    deleteGenre: async (_, { id }, { dataSources }) => {
      const res = await dataSources.genreData.deleteGenre(id);
      return res;
    },
  },
  Genre: {
    id: (parent) => parent._id,
  },
};

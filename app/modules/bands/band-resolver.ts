import { IArtist } from '../artists/artist';
import { IMember } from './band';

export const bandResolver = {
  Query: {
    band: async (_, { id }, { dataSources }) => {
      const res = await dataSources.bandData.getBandById(id);
      return res;
    },
    bands: async (_, { limit, offset }, { dataSources }) => {
      const res = await dataSources.bandData.getAllBands(limit, offset);
      return res;
    },
  },
  Mutation: {
    createBand: async (_, { band }, { dataSources }) => {
      const newBand = { ...band };
      const res = await dataSources.bandData.createBand(newBand);
      return res;
    },
    updateBand: async (_, { id, band }, { dataSources }) => {
      const newBand = { ...band };
      const res = await dataSources.bandData.updateBand(id, newBand);
      return res;
    },
    deleteBand: async (_, { id }, { dataSources }) => {
      const res = await dataSources.bandData.deleteBand(id);
      return res;
    },
  },
  Band: {
    id: (parent) => parent._id,
    genres: async ({ genresIds }, _, { dataSources }) => {
      const res = await Promise.all(
        genresIds.map((genreId) =>
          dataSources.genreService.getGenreById(genreId)
        )
      );
      return res;
    },
    members: async ({ members }, _, { dataSources }) => {
      const res: IArtist[] = await Promise.all(
        members.map((member: IMember) =>
          dataSources.artistData.getArtistById(member._id)
        )
      );

      return res.map((artist: IArtist, idx: number) => ({
        id: artist.id,
        artist: `${artist.firstName} ${
          artist.middleName ? artist.middleName : ''
        } ${artist.secondName}`,
        instrument: members[idx].instrument,
        years: members[idx].years,
      }));
    },
  },
};

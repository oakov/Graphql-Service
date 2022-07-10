import { ArtistData } from './modules/artists/artist-service';
import { BandData } from './modules/bands/band-service';
import { genreResolver } from './modules/genres/genre-resolver';
import { GenreData } from './modules/genres/genre-service';
import { userType } from './modules/users/user';
import { userResolver } from './modules/users/user-resolver';
import { UserData } from './modules/users/user-service';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { genreType } from './modules/genres/genre';
import { artistType } from './modules/artists/artist';
import { bandType } from './modules/bands/band';
import { bandResolver } from './modules/bands/band-resolver';
import { artistResolver } from './modules/artists/artist-resolver';

export interface Context {
  dataSources: {
    userData: UserData;
    genreData: GenreData;
    bandData: BandData;
    artistData: ArtistData;
  };
}

export const dataSources = () => ({
  userData: new UserData(),
  genreData: new GenreData(),
  bandData: new BandData(),
  artistData: new ArtistData(),
});

export const auth = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM4MTg1NjBkOTJlZDM4NWEyYjI3YTMiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjlAZ21haWwuY29tIiwiaWF0IjoxNjU3NDUzNTg2fQ.EbUswpinJUOJ0hW0er49LP5gkM9uu4jwQz-uCmhHKvY',
};

// export const typeDefs = [userType];

// export const resolvers = { ...userResolver, ...genreResolver };

export type Deleted = {
  acknowledged: boolean;
  deletedCount: number;
};

export const schema = makeExecutableSchema({
  typeDefs: [userType, genreType, bandType, artistType],
  resolvers: [userResolver, genreResolver, bandResolver, artistResolver],
});

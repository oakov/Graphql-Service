import { ArtistResolver } from './modules/artists/artist-resolver';
import { ArtistService } from './modules/artists/artist-service';
import { BandResolver } from './modules/bands/band-resolver';
import { BandService } from './modules/bands/band-service';
import { genreResolver } from './modules/genres/genre-resolver';
import { GenreData } from './modules/genres/genre-service';
import { userType } from './modules/users/user';
import { userResolver } from './modules/users/user-resolver';
import { UserData } from './modules/users/user-service';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { genreType } from './modules/genres/genre';

export interface Context {
  dataSources: {
    userData: UserData;
    genreData: GenreData;
    bandService: BandService;
    artistService: ArtistService;
  };
}

export const dataSources = () => ({
  userData: new UserData(),
  genreData: new GenreData(),
  bandService: new BandService(),
  artistService: new ArtistService(),
});

export const auth = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM4MTg1NjBkOTJlZDM4NWEyYjI3YTMiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjlAZ21haWwuY29tIiwiaWF0IjoxNjU3NDUzNTg2fQ.EbUswpinJUOJ0hW0er49LP5gkM9uu4jwQz-uCmhHKvY',
};

export const typeDefs = [userType];

export const resolvers = { ...userResolver, ...genreResolver };

export type Deleted = {
  acknowledged: boolean;
  deletedCount: number;
};

export const schema = makeExecutableSchema({
  typeDefs: [userType, genreType],
  resolvers: [userResolver, genreResolver],
});

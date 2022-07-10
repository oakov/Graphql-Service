import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { ArtistResolver } from './modules/artists/artist-resolver';
import { ArtistService } from './modules/artists/artist-service';
import { BandResolver } from './modules/bands/band-resolver';
import { BandService } from './modules/bands/band-service';
import { GenreResolver } from './modules/genres/genre-resolver';
import { GenreService } from './modules/genres/genre-service';
import { UserResolver } from './modules/users/user-resolver';
import { UserService } from './modules/users/user-service';

export interface Context {
  dataSources: {
    userService: UserService;
    genreService: GenreService;
    bandService: BandService;
    artistService: ArtistService;
  };
}

export const schemaGQL = Promise.resolve(
  buildSchema({
    resolvers: [UserResolver, GenreResolver, BandResolver, ArtistResolver],
    emitSchemaFile: {
      path: __dirname + '/schema.gql',
      commentDescriptions: true,
      sortedSchema: false,
    },
  })
);

export const dataSources = () => ({
  userService: new UserService(),
  genreService: new GenreService(),
  bandService: new BandService(),
  artistService: new ArtistService(),
});

export const auth = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM4MTg1NjBkOTJlZDM4NWEyYjI3YTMiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjlAZ21haWwuY29tIiwiaWF0IjoxNjU3NDUzNTg2fQ.EbUswpinJUOJ0hW0er49LP5gkM9uu4jwQz-uCmhHKvY',
};

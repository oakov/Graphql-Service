import path from 'path';
import { buildSchema } from 'type-graphql';
import { GenreResolver } from './modules/genres/genre-resolver';
import { GenreService } from './modules/genres/genre-service';
import { UserResolver } from './modules/users/user-resolver';
import { UserService } from './modules/users/user-service';

export interface Context {
  dataSources: {
    userService: UserService;
    genreService: GenreService;
  };
}

export const schemaGQL = Promise.resolve(
  buildSchema({
    resolvers: [UserResolver, GenreResolver],
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
});

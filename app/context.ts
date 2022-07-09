import path from 'path';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/users/user-resolver';
import { UserService } from './modules/users/user-service';

export interface Context {
  dataSources: {
    userService: UserService;
  };
}

export const schemaGQL = Promise.resolve(
  buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: {
      path: path.resolve(__dirname, '/schema.gql'),
      commentDescriptions: true,
      sortedSchema: false,
    },
  })
);

export const dataSources = () => ({
  userService: new UserService(),
});

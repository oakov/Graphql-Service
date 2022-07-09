import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { dataSources, schemaGQL } from './context';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const schema = await schemaGQL;
  const server = new ApolloServer({
    schema,
    dataSources,
    context: ({ req }) => ({
      token: req.headers.authorization || '',
    }),
  });

  const { url } = await server.listen({ port: PORT });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();

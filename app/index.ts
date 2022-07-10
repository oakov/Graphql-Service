import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { auth, dataSources, schema } from './context';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    dataSources,
    context: ({ req }) => ({
      token: req.headers.authorization || auth.token,
    }),
  });

  const { url } = await server.listen({ port: PORT });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();

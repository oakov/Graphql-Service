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
      token:
        req.headers.authorization ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM4MTg1NjBkOTJlZDM4NWEyYjI3YTMiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjlAZ21haWwuY29tIiwiaWF0IjoxNjU3NDUzNTg2fQ.EbUswpinJUOJ0hW0er49LP5gkM9uu4jwQz-uCmhHKvY',
    }),
  });

  const { url } = await server.listen({ port: PORT });
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();

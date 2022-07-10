import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql';
import { Context } from '../../context';
import { Artist } from './artist-type';

@Resolver((of) => Artist)
export class ArtistResolver {
  @Query((returns) => Artist, { nullable: true })
  async band(
    @Arg('id', (type) => ID) id: string,
    @Ctx() context: Context
  ): Promise<Artist | undefined> {
    return context.dataSources.artistService.getArtistById(id);
  }
}

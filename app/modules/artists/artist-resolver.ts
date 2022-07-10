import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Context } from '../../context';
import { Artist, ArtistInput } from './artist-type';

@Resolver((of) => Artist)
export class ArtistResolver {
  @Query((returns) => Artist, { nullable: true })
  async artist(
    @Arg('id', (type) => ID) id: string,
    @Ctx() context: Context
  ): Promise<Artist | undefined> {
    return context.dataSources.artistService.getArtistById(id);
  }

  @Query((returns) => [Artist], { nullable: 'itemsAndList' })
  async artists(
    @Arg('limit', (type) => Int, { nullable: true }) limit: number,
    @Arg('offset', (type) => Int, { nullable: true }) offset: number,
    @Ctx() context: Context
  ): Promise<Artist[] | undefined> {
    return context.dataSources.artistService.getAllArtists(limit, offset);
  }

  @Mutation((returns) => Artist)
  createArtist(
    @Arg('artist') newArtist: ArtistInput,
    @Ctx() context: Context
  ): Promise<Artist> {
    return context.dataSources.artistService.createArtist({ ...newArtist });
  }

  @FieldResolver()
  async bands(@Root() artist: Artist, @Ctx() context: Context) {
    const res = await Promise.all(
      artist.bandsIds.map((bandId) =>
        context.dataSources.bandService.getBandById(bandId)
      )
    );
    return res;
  }
}

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
import { Genre } from '../genres/genre-type';
import { Band, BandInput } from './band-type';

@Resolver((of) => Band)
export class BandResolver {
  @Query((returns) => Band, { nullable: true })
  async band(
    @Arg('id', (type) => ID) id: string,
    @Ctx() context: Context
  ): Promise<Band | undefined> {
    return context.dataSources.bandService.getBandById(id);
  }

  @Query((returns) => [Band], { nullable: 'itemsAndList' })
  async bands(
    @Arg('limit', (type) => Int, { nullable: true }) limit: number,
    @Arg('offset', (type) => Int, { nullable: true }) offset: number,
    @Ctx() context: Context
  ): Promise<Band[] | undefined> {
    return context.dataSources.bandService.getAllBands(limit, offset);
  }

  @Mutation((returns) => Band)
  createBand(
    @Arg('band') newBand: BandInput,
    // @Arg('name') name: string,
    // @Arg('origin') origin: string,
    // @Arg('website') website: string,
    // @Arg('genresIds') genresIds: string[],
    @Ctx() context: Context
  ): Promise<Band> {
    return context.dataSources.bandService.createBand({
      ...newBand,
      // name,
      // origin,
      // website,
      // genresIds,
    });
  }

  @FieldResolver()
  async genres(@Root() band: Band, @Ctx() context: Context) {
    const res = await Promise.all(
      band.genresIds.map((genreId) =>
        context.dataSources.genreService.getGenreById(genreId)
      )
    );
    return res;
  }
}

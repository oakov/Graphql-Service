import { Arg, Ctx, ID, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../../context';
import { Genre, GenreInput } from './genre-type';

@Resolver()
export class GenreResolver {
  @Query((returns) => Genre, { nullable: true })
  async genre(
    @Arg('id', (type) => ID) id: string,
    @Ctx() context: Context
  ): Promise<Genre | undefined> {
    return context.dataSources.genreService.getGenreById(id);
  }

  @Query((returns) => [Genre], { nullable: 'itemsAndList' })
  async genres(
    @Arg('limit', (type) => Int, { nullable: true }) limit,
    @Arg('offset', (type) => Int, { nullable: true }) offset: number,
    @Ctx() context: Context
  ): Promise<Genre[] | undefined> {
    return context.dataSources.genreService.getAllGenres(limit, offset);
  }

  @Mutation((returns) => Genre, { nullable: true })
  createGenre(
    @Arg('genre') newGenre: GenreInput,
    @Ctx() context: Context
  ): Promise<Genre> {
    return context.dataSources.genreService.createGenre({ ...newGenre });
  }

  @Mutation((returns) => Genre, { nullable: true })
  updateGenre(
    @Arg('id', (type) => ID) id: string,
    @Arg('genre') newGenre: GenreInput,
    @Ctx() context: Context
  ): Promise<Genre> {
    return context.dataSources.genreService.updateGenre(id, { ...newGenre });
  }

  @Mutation((returns) => Genre, { nullable: true })
  deleteGenre(
    @Arg('id', (type) => ID) id: string,
    @Ctx() context: Context
  ): Promise<Genre> {
    return context.dataSources.genreService.deleteGenre(id);
  }
}

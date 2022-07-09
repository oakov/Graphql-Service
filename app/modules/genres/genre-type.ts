import { ObjectType, Field, ID, InputType, Int } from 'type-graphql';

export interface IGenreInput {
  name: string;
  description: string;
  country: string;
  year: number;
}

export interface IGenre extends IGenreInput {
  id: string;
}

@ObjectType()
export class Genre implements IGenre {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  country: string;

  @Field((type) => Int, { nullable: true })
  year: number;
}

@InputType()
export class GenreInput implements IGenreInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  year: number;
}

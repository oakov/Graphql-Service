import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Genre } from '../genres/genre-type';

export interface IBandInput {
  name: string;
  origin: string;
  // members: Member[];
  website: string;
  genresIds: string[];
}

export interface IBand extends IBandInput {
  id: string;
  genres: Genre[];
}

export interface IMember {
  id: string;
  artist: string;
  instrument: string;
  years: string[];
}

@ObjectType()
export class Member implements IMember {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  artist: string;

  @Field({ nullable: true })
  instrument: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  years: string[];
}

@ObjectType()
export class Band implements IBand {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  origin: string;

  // @Field({ nullable: true })
  // members: Member[];

  @Field({ nullable: true })
  website: string;

  genresIds: string[];

  @Field((type) => [Genre], { nullable: 'itemsAndList' })
  genres: Genre[];
}

@InputType()
export class BandInput implements IBandInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  origin: string;

  // @Field({ nullable: true })
  // members: Member[];

  @Field({ nullable: true })
  website: string;

  @Field((type) => [ID], { nullable: 'itemsAndList' })
  genresIds: string[];
}

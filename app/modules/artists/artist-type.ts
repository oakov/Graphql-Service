import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Band } from '../bands/band-type';

export interface IArtistInput {
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
}

export interface IArtist extends IArtistInput {
  id: string;
  bands: Band[];
}

@ObjectType()
export class Artist implements IArtist {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  secondName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  birthPlace: string;

  @Field({ nullable: true })
  country: string;

  bandsIds: string[];

  @Field((type) => [Band], { nullable: 'itemsAndList' })
  bands: Band[];

  @Field({ nullable: true })
  instruments: string[];
}

@InputType()
export class ArtistInput implements IArtistInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  secondName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  birthPlace: string;

  @Field({ nullable: true })
  country: string;

  @Field((type) => [ID], { nullable: 'itemsAndList' })
  bandsIds: string[];

  @Field({ nullable: true })
  instruments: string[];
}

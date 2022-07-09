import { Field, ObjectType, ID, InputType } from 'type-graphql';
import { UserService } from './user-service';

export interface IUserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
export interface IUser extends IUserInput {
  id: string;
}

@ObjectType()
export class User implements IUser {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  email: string;
}

@ObjectType()
export class JWT {
  @Field()
  jwt: string;
}

@InputType()
export class UserInput implements IUserInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  email: string;
}

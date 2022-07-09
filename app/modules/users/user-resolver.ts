import { Resolver, Query, Arg, ID, Ctx, Mutation } from 'type-graphql';
import { Context } from '../../context';

import { JWT, User, UserInput } from './user-type';

@Resolver()
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  async user(
    @Arg('id', (type) => ID) id: string,
    @Ctx() context: Context
  ): Promise<User | undefined> {
    return context.dataSources.userService.getUserById(id);
  }

  @Query((returns) => JWT, { nullable: true })
  async jwt(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() context: Context
  ): Promise<JWT | undefined> {
    return context.dataSources.userService.login(email, password);
  }

  @Mutation((returns) => User, { nullable: true })
  register(
    @Arg('user') newUser: UserInput,
    @Ctx() context: Context
  ): Promise<User> {
    return context.dataSources.userService.register({ ...newUser });
  }
}

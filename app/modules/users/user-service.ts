import { RESTDataSource } from 'apollo-datasource-rest';
import { IUser, IUserInput } from './user-type';

export class UserService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL;
  }

  async getUserById(id: string): Promise<IUser> {
    const data = await this.get(`/${encodeURIComponent(id)}`);
    if (data) {
      data.id = data._id;
    }
    return data;
  }

  async login(email: string, password: string): Promise<{ jwt: string }> {
    const data = await this.post('/login', { email, password });
    this.context.token = data.jwt;
    return data;
  }

  async register(user: IUserInput): Promise<IUser> {
    const data = await this.post('/register', user);
    if (data) {
      data.id = data._id;
    }
    return data;
  }
}

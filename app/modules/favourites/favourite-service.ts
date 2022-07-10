import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { FavouritesField, IFavourites } from './favourite';

export class FavouritesData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.FAVOURITES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAllFavourites(): Promise<IFavourites> {
    const data = await this.get('/');

    if (!data) {
      throw new Error('Favourites not found');
    }

    return data;
  }

  async addToFavourites(
    type: FavouritesField,
    id: string
  ): Promise<IFavourites> {
    const data = await this.put('/add', { id, type });
    return data;
  }

  async removeFromFavourites(
    type: FavouritesField,
    id: string
  ): Promise<IFavourites> {
    const data = await this.put('/remove', { id, type });
    return data;
  }
}

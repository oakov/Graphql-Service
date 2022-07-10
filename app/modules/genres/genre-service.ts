import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IGenre, IGenreInput } from './genre-type';

export class GenreService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getGenreById(id: string): Promise<IGenre> {
    const data = await this.get(`/${encodeURIComponent(id)}`);

    if (!data) {
      throw new Error('Genre not found');
    } else {
      data.id = data._id;
    }
    return data;
  }

  async getAllGenres(limit: number = 5, offset: number = 0): Promise<IGenre[]> {
    const data = await this.get('/', { limit, offset });

    if (!data) {
      throw new Error('Genres not found');
    } else {
      data.items.forEach((genre) => (genre.id = genre._id));
      return data.items;
    }
  }

  async createGenre(genre: IGenreInput): Promise<IGenre> {
    const data = await this.post('', genre);
    return data;
  }

  async deleteGenre(id: string): Promise<any> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }

  async updateGenre(id: string, genre: IGenreInput): Promise<IGenre> {
    const data = await this.put(`/${encodeURIComponent(id)}`, genre);
    if (!data) {
      throw new Error('Genre not found');
    } else {
      data.id = data._id;
    }
    return data;
  }
}

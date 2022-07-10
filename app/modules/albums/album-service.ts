import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted } from '../../context';
import { IAlbum, IAlbumInput } from './album';

export class AlbumData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ALBUMS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAlbumById(id: string): Promise<IAlbum> {
    const data = await this.get(`/${encodeURIComponent(id)}`);

    if (!data) {
      throw new Error('Album not found');
    }

    return data;
  }

  async getAllAlbums(limit: number = 5, offset: number = 0): Promise<IAlbum[]> {
    const data = await this.get('/', { limit, offset });

    if (!data) {
      throw new Error('Albums not found');
    } else {
      data.items.forEach((album) => (album.id = album._id));
      return data.items;
    }
  }

  async createAlbum(album: IAlbumInput): Promise<IAlbum> {
    const data = await this.post('', album);
    return data;
  }

  async updateAlbum(id: string, album: IAlbumInput): Promise<IAlbum> {
    const data = await this.put(`/${encodeURIComponent(id)}`, album);
    return data;
  }

  async deleteAlbum(id: string): Promise<Deleted> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }
}

import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted } from '../../context';
import { IArtist, IArtistInput } from './artist';

export class ArtistData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getArtistById(id: string): Promise<IArtist> {
    const data = await this.get(`/${encodeURIComponent(id)}`);

    if (!data) {
      throw new Error('Artist not found');
    }

    if (data.instruments && Array.isArray(data.instruments)) {
      data.instruments = data.instruments.join(', ');
    }

    return data;
  }

  async getAllArtists(
    limit: number = 5,
    offset: number = 0
  ): Promise<IArtist[]> {
    const data = await this.get('/', { limit, offset });

    if (!data) {
      throw new Error('Artists not found');
    }

    data.items.forEach((artist) => {
      artist.id = artist._id;
      if (artist.instruments && Array.isArray(artist.instruments)) {
        artist.instruments = artist.instruments.join(', ');
      }
    });

    return data.items;
  }

  async createArtist(artist: IArtistInput): Promise<IArtist> {
    const data = await this.post('', artist);

    if (data.instruments && Array.isArray(data.instruments)) {
      data.instruments = data.instruments.join(', ');
    }

    return data;
  }

  async updateArtist(id: string, artist: IArtistInput): Promise<IArtist> {
    const data = await this.put(`/${encodeURIComponent(id)}`, artist);

    if (data.instruments && Array.isArray(data.instruments)) {
      data.instruments = data.instruments.join(', ');
    }

    return data;
  }

  async deleteArtist(id: string): Promise<Deleted> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }
}

import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { request } from 'https';
import { auth } from '../../context';
import { IBand, IBandInput } from './band-type';

export class BandService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getBandById(id: string): Promise<IBand> {
    const data = await this.get(`/${encodeURIComponent(id)}`);
    if (!data) {
      throw new Error('Band not found');
    } else {
      data.id = data._id;
    }
    return data;
  }

  async getAllBands(limit: number = 5, offset: number = 0): Promise<IBand[]> {
    const data = await this.get('/', { limit, offset });

    if (!data) {
      throw new Error('Bands not found');
    } else {
      data.items.forEach((band) => (band.id = band._id));
      return data.items;
    }
  }

  async createBand(band: IBandInput): Promise<IBand> {
    const data = await this.post('', band);
    if (data) data.id = data._id;
    return data;
  }

  async updateBand(id: string, band: IBand): Promise<IBand> {
    const data = await this.put(`/${encodeURIComponent(id)}`, band);
    return data;
  }

  async deleteBand(id: string): Promise<any> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }
}

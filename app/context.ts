import { ArtistData } from './modules/artists/artist-service';
import { BandData } from './modules/bands/band-service';
import { genreResolver } from './modules/genres/genre-resolver';
import { GenreData } from './modules/genres/genre-service';
import { userType } from './modules/users/user';
import { userResolver } from './modules/users/user-resolver';
import { UserData } from './modules/users/user-service';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { genreType } from './modules/genres/genre';
import { artistType } from './modules/artists/artist';
import { bandType } from './modules/bands/band';
import { bandResolver } from './modules/bands/band-resolver';
import { artistResolver } from './modules/artists/artist-resolver';
import { AlbumData } from './modules/albums/album-service';
import { albumType } from './modules/albums/album';
import { albumResolver } from './modules/albums/album-resolver';
import { FavouritesData } from './modules/favourites/favourite-service';
import { favouritesType } from './modules/favourites/favourite';
import { favouriteResolver } from './modules/favourites/favourite-resolver';
import { TrackData } from './modules/tracks/track-service';
import { trackType } from './modules/tracks/track';
import { trackResolver } from './modules/tracks/track-resolver';

export interface Context {
  dataSources: {
    userData: UserData;
    genreData: GenreData;
    bandData: BandData;
    artistData: ArtistData;
    albumData: AlbumData;
    favouritesData: FavouritesData;
    trackData: TrackData;
  };
}

export const dataSources = () => ({
  userData: new UserData(),
  genreData: new GenreData(),
  bandData: new BandData(),
  artistData: new ArtistData(),
  albumData: new AlbumData(),
  favouritesData: new FavouritesData(),
  trackData: new TrackData(),
});

export const auth = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM4MTg1NjBkOTJlZDM4NWEyYjI3YTMiLCJmaXJzdE5hbWUiOiJmaXJzdCBuYW1lIiwibGFzdE5hbWUiOiJsYXN0IG5hbWUiLCJlbWFpbCI6Im1ldDkxMjlAZ21haWwuY29tIiwiaWF0IjoxNjU3NDUzNTg2fQ.EbUswpinJUOJ0hW0er49LP5gkM9uu4jwQz-uCmhHKvY',
};

export type Deleted = {
  acknowledged: boolean;
  deletedCount: number;
};

export const schema = makeExecutableSchema({
  typeDefs: [
    userType,
    genreType,
    bandType,
    artistType,
    albumType,
    favouritesType,
    trackType,
  ],
  resolvers: [
    userResolver,
    genreResolver,
    bandResolver,
    artistResolver,
    albumResolver,
    favouriteResolver,
    trackResolver,
  ],
});

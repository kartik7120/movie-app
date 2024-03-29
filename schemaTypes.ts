import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigStringInt: any;
};

export type Backdrop = {
  __typename?: 'Backdrop';
  aspect_ratio?: Maybe<Scalars['Float']>;
  file_path?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  iso_639_1?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Cast = {
  __typename?: 'Cast';
  adult: Scalars['Boolean'];
  cast_id: Scalars['Int'];
  character: Scalars['String'];
  credit_id: Scalars['String'];
  gender?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  known_for_department: Scalars['String'];
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  original_name: Scalars['String'];
  popularity: Scalars['Int'];
  profile_path?: Maybe<Scalars['String']>;
};

export type CastMap = {
  __typename?: 'CastMap';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<PeopleCast>>>;
};

export type Collection = {
  __typename?: 'Collection';
  backdrop_path?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  poster_path?: Maybe<Scalars['String']>;
};

export type CombinedCredits = {
  __typename?: 'CombinedCredits';
  cast?: Maybe<Array<Maybe<PeopleCast>>>;
  crew?: Maybe<Array<Maybe<PeopleCrew>>>;
  id: Scalars['ID'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  logo_path?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CompanySearchResult = {
  __typename?: 'CompanySearchResult';
  page: Scalars['Int'];
  result?: Maybe<Array<Maybe<Company>>>;
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
};

export type CreatedBy = {
  __typename?: 'CreatedBy';
  credit_id: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  profile_path: Scalars['String'];
};

export type Credits = {
  __typename?: 'Credits';
  cast: Array<Maybe<Cast>>;
  crew: Array<Maybe<Crew>>;
  id?: Maybe<Scalars['ID']>;
};

export type CreditsUnion = CombinedCredits | FormattedCombinedCredits;

export type Crew = {
  __typename?: 'Crew';
  adult: Scalars['Boolean'];
  credit_id: Scalars['String'];
  department: Scalars['String'];
  gender?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  job: Scalars['String'];
  known_for_department: Scalars['String'];
  name: Scalars['String'];
  original_name: Scalars['String'];
  popularity: Scalars['Int'];
  profile_path?: Maybe<Scalars['String']>;
};

/** Date type returned by NowPlaying Type */
export type Dates = {
  __typename?: 'Dates';
  maximum?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['String']>;
};

export type DepartmentMap = {
  __typename?: 'DepartmentMap';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<PeopleCrew>>>;
};

export type Episode = {
  __typename?: 'Episode';
  air_date?: Maybe<Scalars['String']>;
  crew?: Maybe<PeopleCrew>;
  episode_number?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  production_code?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
  still_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Int']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type EpisodeDetail = {
  __typename?: 'EpisodeDetail';
  air_date?: Maybe<Scalars['String']>;
  crew?: Maybe<Array<Maybe<Crew>>>;
  crew_number?: Maybe<Scalars['Int']>;
  guest_stars?: Maybe<Array<Maybe<Cast>>>;
  guest_stars_count?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  production_code?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
  still_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type ExternalIds = {
  __typename?: 'ExternalIds';
  facebook_id?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imdb_id?: Maybe<Scalars['String']>;
  instagram_id?: Maybe<Scalars['String']>;
  twitter_id?: Maybe<Scalars['String']>;
};

export type FormattedCombinedCredits = {
  __typename?: 'FormattedCombinedCredits';
  cast?: Maybe<Array<Maybe<CastMap>>>;
  crew?: Maybe<Array<Maybe<DepartmentMap>>>;
  format?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum ImageType {
  Backdrop = 'BACKDROP',
  Poster = 'POSTER'
}

export type Keyword = {
  __typename?: 'Keyword';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LangMap = {
  __typename?: 'LangMap';
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type MediaImages = {
  __typename?: 'MediaImages';
  backdropLanguageMap?: Maybe<Array<Maybe<LangMap>>>;
  backdrops?: Maybe<Array<Maybe<Backdrop>>>;
  id: Scalars['ID'];
  posterLanguageMap?: Maybe<Array<Maybe<LangMap>>>;
  posters?: Maybe<Array<Maybe<Backdrop>>>;
};

export type MediaMap = {
  __typename?: 'MediaMap';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<MediaVideo>>>;
};

export enum MediaType {
  All = 'ALL',
  Movie = 'MOVIE',
  Person = 'PERSON',
  Tv = 'TV'
}

export type MediaTypeUnion = SpecificMedia | VideoMedia;

export type MediaVideo = {
  __typename?: 'MediaVideo';
  id?: Maybe<Scalars['String']>;
  iso_639_1?: Maybe<Scalars['String']>;
  iso_3166_1?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  official?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['String']>;
  site?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type MovieDetails = {
  __typename?: 'MovieDetails';
  adult: Scalars['Boolean'];
  backdrop_path?: Maybe<Scalars['String']>;
  budget: Scalars['BigStringInt'];
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imdb_id?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Array<Maybe<ProductionCompanies>>>;
  production_countries?: Maybe<Array<Maybe<ProductionCountries>>>;
  release_date?: Maybe<Scalars['String']>;
  revenue?: Maybe<Scalars['BigStringInt']>;
  runtime?: Maybe<Scalars['Int']>;
  spoken_languages?: Maybe<Array<Maybe<SpokenLanguages>>>;
  status?: Maybe<Status>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  video: Scalars['Boolean'];
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type MovieKeywords = {
  __typename?: 'MovieKeywords';
  id: Scalars['ID'];
  keywords?: Maybe<Array<Maybe<Keyword>>>;
};

export type Network = {
  __typename?: 'Network';
  id: Scalars['ID'];
  logo_path: Scalars['String'];
  name: Scalars['String'];
  origin_country: Scalars['String'];
};

/** Describes the currently playing movies in theatre */
export type NowPlaying = {
  __typename?: 'NowPlaying';
  adult?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids: Array<Maybe<Scalars['Int']>>;
  id: Scalars['ID'];
  media_type?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type NowPlayingMovies = {
  __typename?: 'NowPlayingMovies';
  dates?: Maybe<Dates>;
  nowPlaying?: Maybe<Array<Maybe<NowPlaying>>>;
};

/** Describes the currently streaming TV shows */
export type NowPlayingTv = {
  __typename?: 'NowPlayingTv';
  backdrop_path?: Maybe<Scalars['String']>;
  first_air_date?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  id: Scalars['ID'];
  media_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language?: Maybe<Scalars['String']>;
  original_string?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  showname?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Float']>;
};

export type NowPopularComplete = {
  __typename?: 'NowPopularComplete';
  page?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<NowPlaying>>>;
  total_pages?: Maybe<Scalars['Int']>;
  total_results?: Maybe<Scalars['Int']>;
};

export type People = {
  __typename?: 'People';
  adult: Scalars['Boolean'];
  id: Scalars['ID'];
  known_for?: Maybe<Recommendation>;
  media_type?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  popularity: Scalars['Int'];
  profile_path?: Maybe<Scalars['String']>;
};

export type PeopleCast = {
  __typename?: 'PeopleCast';
  adult?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  character?: Maybe<Scalars['String']>;
  credit_id?: Maybe<Scalars['String']>;
  episode_count?: Maybe<Scalars['Int']>;
  first_air_date?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  id: Scalars['ID'];
  media_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type PeopleCrew = {
  __typename?: 'PeopleCrew';
  adult?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  credit_id?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  episode_count?: Maybe<Scalars['Int']>;
  first_air_date?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  id: Scalars['ID'];
  job?: Maybe<Scalars['String']>;
  media_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type PeopleDetails = {
  __typename?: 'PeopleDetails';
  adult?: Maybe<Scalars['Boolean']>;
  also_known_as?: Maybe<Array<Maybe<Scalars['String']>>>;
  biography?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  deathday?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  homepage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imdb_id?: Maybe<Scalars['String']>;
  known_for_department: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  place_of_birth?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  profile_path?: Maybe<Scalars['String']>;
};

export type PeopleImages = {
  __typename?: 'PeopleImages';
  id: Scalars['ID'];
  profiles?: Maybe<Array<Maybe<Backdrop>>>;
};

export type PeopleResult = {
  __typename?: 'PeopleResult';
  page?: Maybe<Scalars['Int']>;
  result?: Maybe<Array<Maybe<People>>>;
  total_pages?: Maybe<Scalars['Int']>;
  total_results?: Maybe<Scalars['Int']>;
};

export type ProductionCompanies = {
  __typename?: 'ProductionCompanies';
  id: Scalars['ID'];
  logo_path?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  origin_country: Scalars['String'];
};

export type ProductionCountries = {
  __typename?: 'ProductionCountries';
  iso_3166_1: Scalars['String'];
  name: Scalars['String'];
};

export type ProviderInfo = {
  __typename?: 'ProviderInfo';
  display_priority?: Maybe<Scalars['Int']>;
  logo_path?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['Int']>;
  provider_name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Search?: Maybe<Search>;
  SearchCollection?: Maybe<SearchCollection>;
  SearchKeywords?: Maybe<SearchKeyword>;
  TvEpisodeDetail?: Maybe<EpisodeDetail>;
  TvEpisodes?: Maybe<SeasonEpisodes>;
  WatchProvidersQuery?: Maybe<WatchProviders>;
  getCast?: Maybe<Credits>;
  getExternalIDs?: Maybe<ExternalIds>;
  getImageMedia?: Maybe<MediaImages>;
  getKeywords?: Maybe<MovieKeywords>;
  getMovieDetails?: Maybe<MovieDetails>;
  getPeopleCredit?: Maybe<CreditsUnion>;
  getPeopleExternalIDs?: Maybe<ExternalIds>;
  getPeopleImages?: Maybe<PeopleImages>;
  getPoplarTv?: Maybe<Array<Maybe<NowPlayingTv>>>;
  getPopularMovies?: Maybe<NowPopularComplete>;
  getSimilarMovies?: Maybe<Array<Maybe<NowPlaying>>>;
  getTvDetails?: Maybe<TvDetails>;
  getVideoMedia?: Maybe<MediaTypeUnion>;
  getrecommendations?: Maybe<Array<Maybe<Recommendation>>>;
  nowPlayingMovies?: Maybe<NowPlayingMovies>;
  nowPlayingTv?: Maybe<Array<Maybe<NowPlayingTv>>>;
  peopleDetails?: Maybe<PeopleDetails>;
  searchCompany?: Maybe<CompanySearchResult>;
  searchMoviesOrTv?: Maybe<SearchResultsMovieOrTv>;
  searchPeople?: Maybe<PeopleResult>;
  topRatedMovies?: Maybe<Array<Maybe<NowPlaying>>>;
  topRatedTvShows?: Maybe<Array<Maybe<NowPlayingTv>>>;
  trending?: Maybe<Array<Maybe<Trending>>>;
  upcomingMovies?: Maybe<NowPlayingMovies>;
};


export type QuerySearchArgs = {
  language?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};


export type QuerySearchCollectionArgs = {
  language?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QuerySearchKeywordsArgs = {
  page?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QueryTvEpisodeDetailArgs = {
  episode_number: Scalars['Int'];
  id: Scalars['ID'];
  season_number: Scalars['Int'];
};


export type QueryTvEpisodesArgs = {
  id: Scalars['ID'];
  season_number: Scalars['Int'];
};


export type QueryWatchProvidersQueryArgs = {
  id: Scalars['Int'];
  media_type: MediaType;
  region?: InputMaybe<Scalars['String']>;
};


export type QueryGetCastArgs = {
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  mediaType: SourceMedia;
};


export type QueryGetExternalIDsArgs = {
  id: Scalars['ID'];
  sourceMedia: SourceMedia;
};


export type QueryGetImageMediaArgs = {
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  includeLanguage?: InputMaybe<Scalars['String']>;
  sourceMedia: SourceMedia;
};


export type QueryGetKeywordsArgs = {
  id: Scalars['ID'];
  mediaType: SourceMedia;
};


export type QueryGetMovieDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryGetPeopleCreditArgs = {
  format: Scalars['Boolean'];
  id: Scalars['ID'];
};


export type QueryGetPeopleExternalIDsArgs = {
  id: Scalars['ID'];
};


export type QueryGetPeopleImagesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
};


export type QueryGetPopularMoviesArgs = {
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSimilarMoviesArgs = {
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryGetTvDetailsArgs = {
  id: Scalars['ID'];
};


export type QueryGetVideoMediaArgs = {
  id: Scalars['ID'];
  include_type?: InputMaybe<Scalars['String']>;
  sourceMedia: SourceMedia;
};


export type QueryGetrecommendationsArgs = {
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  sourceMedia: SourceMedia;
};


export type QueryPeopleDetailsArgs = {
  id: Scalars['ID'];
};


export type QuerySearchCompanyArgs = {
  page?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QuerySearchMoviesOrTvArgs = {
  include_adult?: InputMaybe<Scalars['Boolean']>;
  mediaType: SourceMedia;
  page?: InputMaybe<Scalars['String']>;
  query: Scalars['String'];
  region?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchPeopleArgs = {
  include_adult?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
  region?: InputMaybe<Scalars['String']>;
};


export type QueryTrendingArgs = {
  mediaType?: InputMaybe<MediaType>;
  timeWindow?: InputMaybe<TimeWindow>;
};

export type Recommendation = NowPlaying | NowPlayingTv;

export type Review = {
  __typename?: 'Review';
  rating?: Maybe<Scalars['Int']>;
  review: Scalars['String'];
  spolier?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type Search = {
  __typename?: 'Search';
  page?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<SearchResult>>>;
  total_pages?: Maybe<Scalars['Int']>;
  total_results?: Maybe<Scalars['Int']>;
};

export type SearchCollection = {
  __typename?: 'SearchCollection';
  page: Scalars['Int'];
  results?: Maybe<Array<Maybe<Collection>>>;
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
};

export type SearchKeyword = {
  __typename?: 'SearchKeyword';
  page?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<Keyword>>>;
  total_pages?: Maybe<Scalars['Int']>;
  total_results?: Maybe<Scalars['Int']>;
};

export type SearchResult = NowPlaying | NowPlayingTv | People;

export type SearchResultsMovieOrTv = {
  __typename?: 'SearchResultsMovieOrTv';
  page?: Maybe<Scalars['Int']>;
  result?: Maybe<Array<Maybe<Recommendation>>>;
  total_pages?: Maybe<Scalars['Int']>;
  total_results?: Maybe<Scalars['Int']>;
};

export type Season = {
  __typename?: 'Season';
  air_date?: Maybe<Scalars['String']>;
  episode_count?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
};

export type SeasonEpisodes = {
  __typename?: 'SeasonEpisodes';
  _id?: Maybe<Scalars['String']>;
  air_date?: Maybe<Scalars['String']>;
  episodes?: Maybe<Array<Maybe<Episode>>>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  season_number?: Maybe<Scalars['Int']>;
};

export enum SourceMedia {
  Movie = 'MOVIE',
  Tv = 'TV'
}

export type SpecificMedia = {
  __typename?: 'SpecificMedia';
  format?: Maybe<Scalars['Boolean']>;
  mediaMap?: Maybe<Array<Maybe<MediaMap>>>;
  typeMedia?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SpokenLanguages = {
  __typename?: 'SpokenLanguages';
  iso_639_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum Status {
  Canceled = 'CANCELED',
  InProduction = 'IN_PRODUCTION',
  Planned = 'PLANNED',
  PostProduction = 'POST_PRODUCTION',
  Released = 'RELEASED',
  Rumored = 'RUMORED'
}

export enum TimeWindow {
  Day = 'DAY',
  Week = 'WEEK'
}

/** Get the daily or weekly trending items */
export type Trending = {
  __typename?: 'Trending';
  adult: Scalars['Boolean'];
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids: Array<Maybe<Scalars['Int']>>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  original_language: Scalars['String'];
  original_title?: Maybe<Scalars['String']>;
  overview: Scalars['String'];
  /** @deprecated Not being used */
  page: Scalars['Int'];
  popularity: Scalars['Int'];
  poster_path?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
  video?: Maybe<Scalars['Boolean']>;
  vote_count: Scalars['Int'];
};

export type TvDetails = {
  __typename?: 'TvDetails';
  backdrop_path?: Maybe<Scalars['String']>;
  created_by?: Maybe<CreatedBy>;
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']>>>;
  first_air_date?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  in_production: Scalars['Boolean'];
  languages: Array<Maybe<Scalars['String']>>;
  last_air_date?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<Network>>>;
  number_of_episodes?: Maybe<Scalars['Int']>;
  number_of_seasons?: Maybe<Scalars['Int']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  production_companies?: Maybe<Array<Maybe<ProductionCompanies>>>;
  production_countries?: Maybe<Array<Maybe<ProductionCountries>>>;
  seasons?: Maybe<Array<Maybe<Season>>>;
  spoken_languages?: Maybe<Array<Maybe<SpokenLanguages>>>;
  status?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
};

export type WatchProviderResult = {
  __typename?: 'WatchProviderResult';
  buy?: Maybe<Array<Maybe<ProviderInfo>>>;
  flatrate?: Maybe<Array<Maybe<ProviderInfo>>>;
  link?: Maybe<Scalars['String']>;
  rent?: Maybe<Array<Maybe<ProviderInfo>>>;
};

export type WatchProviders = {
  __typename?: 'WatchProviders';
  id?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<WatchProvidersMap>>>;
};

export type WatchProvidersMap = {
  __typename?: 'WatchProvidersMap';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<WatchProviderResult>;
};

export type VideoMedia = {
  __typename?: 'videoMedia';
  mediaVideo?: Maybe<Array<Maybe<MediaVideo>>>;
  typeMap?: Maybe<Array<Maybe<Scalars['String']>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Backdrop: ResolverTypeWrapper<Backdrop>;
  BigStringInt: ResolverTypeWrapper<Scalars['BigStringInt']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Cast: ResolverTypeWrapper<Cast>;
  CastMap: ResolverTypeWrapper<CastMap>;
  Collection: ResolverTypeWrapper<Collection>;
  CombinedCredits: ResolverTypeWrapper<CombinedCredits>;
  Company: ResolverTypeWrapper<Company>;
  CompanySearchResult: ResolverTypeWrapper<CompanySearchResult>;
  CreatedBy: ResolverTypeWrapper<CreatedBy>;
  Credits: ResolverTypeWrapper<Credits>;
  CreditsUnion: ResolversTypes['CombinedCredits'] | ResolversTypes['FormattedCombinedCredits'];
  Crew: ResolverTypeWrapper<Crew>;
  Dates: ResolverTypeWrapper<Dates>;
  DepartmentMap: ResolverTypeWrapper<DepartmentMap>;
  Episode: ResolverTypeWrapper<Episode>;
  EpisodeDetail: ResolverTypeWrapper<EpisodeDetail>;
  ExternalIds: ResolverTypeWrapper<ExternalIds>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FormattedCombinedCredits: ResolverTypeWrapper<FormattedCombinedCredits>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageType: ImageType;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Keyword: ResolverTypeWrapper<Keyword>;
  LangMap: ResolverTypeWrapper<LangMap>;
  MediaImages: ResolverTypeWrapper<MediaImages>;
  MediaMap: ResolverTypeWrapper<MediaMap>;
  MediaType: MediaType;
  MediaTypeUnion: ResolversTypes['SpecificMedia'] | ResolversTypes['videoMedia'];
  MediaVideo: ResolverTypeWrapper<MediaVideo>;
  MovieDetails: ResolverTypeWrapper<MovieDetails>;
  MovieKeywords: ResolverTypeWrapper<MovieKeywords>;
  Network: ResolverTypeWrapper<Network>;
  NowPlaying: ResolverTypeWrapper<NowPlaying>;
  NowPlayingMovies: ResolverTypeWrapper<NowPlayingMovies>;
  NowPlayingTv: ResolverTypeWrapper<NowPlayingTv>;
  NowPopularComplete: ResolverTypeWrapper<NowPopularComplete>;
  People: ResolverTypeWrapper<Omit<People, 'known_for'> & { known_for?: Maybe<ResolversTypes['Recommendation']> }>;
  PeopleCast: ResolverTypeWrapper<PeopleCast>;
  PeopleCrew: ResolverTypeWrapper<PeopleCrew>;
  PeopleDetails: ResolverTypeWrapper<PeopleDetails>;
  PeopleImages: ResolverTypeWrapper<PeopleImages>;
  PeopleResult: ResolverTypeWrapper<PeopleResult>;
  ProductionCompanies: ResolverTypeWrapper<ProductionCompanies>;
  ProductionCountries: ResolverTypeWrapper<ProductionCountries>;
  ProviderInfo: ResolverTypeWrapper<ProviderInfo>;
  Query: ResolverTypeWrapper<{}>;
  Recommendation: ResolversTypes['NowPlaying'] | ResolversTypes['NowPlayingTv'];
  Review: ResolverTypeWrapper<Review>;
  Search: ResolverTypeWrapper<Omit<Search, 'results'> & { results?: Maybe<Array<Maybe<ResolversTypes['SearchResult']>>> }>;
  SearchCollection: ResolverTypeWrapper<SearchCollection>;
  SearchKeyword: ResolverTypeWrapper<SearchKeyword>;
  SearchResult: ResolversTypes['NowPlaying'] | ResolversTypes['NowPlayingTv'] | ResolversTypes['People'];
  SearchResultsMovieOrTv: ResolverTypeWrapper<Omit<SearchResultsMovieOrTv, 'result'> & { result?: Maybe<Array<Maybe<ResolversTypes['Recommendation']>>> }>;
  Season: ResolverTypeWrapper<Season>;
  SeasonEpisodes: ResolverTypeWrapper<SeasonEpisodes>;
  SourceMedia: SourceMedia;
  SpecificMedia: ResolverTypeWrapper<SpecificMedia>;
  SpokenLanguages: ResolverTypeWrapper<SpokenLanguages>;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  TimeWindow: TimeWindow;
  Trending: ResolverTypeWrapper<Trending>;
  TvDetails: ResolverTypeWrapper<TvDetails>;
  WatchProviderResult: ResolverTypeWrapper<WatchProviderResult>;
  WatchProviders: ResolverTypeWrapper<WatchProviders>;
  WatchProvidersMap: ResolverTypeWrapper<WatchProvidersMap>;
  videoMedia: ResolverTypeWrapper<VideoMedia>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Backdrop: Backdrop;
  BigStringInt: Scalars['BigStringInt'];
  Boolean: Scalars['Boolean'];
  Cast: Cast;
  CastMap: CastMap;
  Collection: Collection;
  CombinedCredits: CombinedCredits;
  Company: Company;
  CompanySearchResult: CompanySearchResult;
  CreatedBy: CreatedBy;
  Credits: Credits;
  CreditsUnion: ResolversParentTypes['CombinedCredits'] | ResolversParentTypes['FormattedCombinedCredits'];
  Crew: Crew;
  Dates: Dates;
  DepartmentMap: DepartmentMap;
  Episode: Episode;
  EpisodeDetail: EpisodeDetail;
  ExternalIds: ExternalIds;
  Float: Scalars['Float'];
  FormattedCombinedCredits: FormattedCombinedCredits;
  Genre: Genre;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Keyword: Keyword;
  LangMap: LangMap;
  MediaImages: MediaImages;
  MediaMap: MediaMap;
  MediaTypeUnion: ResolversParentTypes['SpecificMedia'] | ResolversParentTypes['videoMedia'];
  MediaVideo: MediaVideo;
  MovieDetails: MovieDetails;
  MovieKeywords: MovieKeywords;
  Network: Network;
  NowPlaying: NowPlaying;
  NowPlayingMovies: NowPlayingMovies;
  NowPlayingTv: NowPlayingTv;
  NowPopularComplete: NowPopularComplete;
  People: Omit<People, 'known_for'> & { known_for?: Maybe<ResolversParentTypes['Recommendation']> };
  PeopleCast: PeopleCast;
  PeopleCrew: PeopleCrew;
  PeopleDetails: PeopleDetails;
  PeopleImages: PeopleImages;
  PeopleResult: PeopleResult;
  ProductionCompanies: ProductionCompanies;
  ProductionCountries: ProductionCountries;
  ProviderInfo: ProviderInfo;
  Query: {};
  Recommendation: ResolversParentTypes['NowPlaying'] | ResolversParentTypes['NowPlayingTv'];
  Review: Review;
  Search: Omit<Search, 'results'> & { results?: Maybe<Array<Maybe<ResolversParentTypes['SearchResult']>>> };
  SearchCollection: SearchCollection;
  SearchKeyword: SearchKeyword;
  SearchResult: ResolversParentTypes['NowPlaying'] | ResolversParentTypes['NowPlayingTv'] | ResolversParentTypes['People'];
  SearchResultsMovieOrTv: Omit<SearchResultsMovieOrTv, 'result'> & { result?: Maybe<Array<Maybe<ResolversParentTypes['Recommendation']>>> };
  Season: Season;
  SeasonEpisodes: SeasonEpisodes;
  SpecificMedia: SpecificMedia;
  SpokenLanguages: SpokenLanguages;
  String: Scalars['String'];
  Trending: Trending;
  TvDetails: TvDetails;
  WatchProviderResult: WatchProviderResult;
  WatchProviders: WatchProviders;
  WatchProvidersMap: WatchProvidersMap;
  videoMedia: VideoMedia;
};

export type BackdropResolvers<ContextType = any, ParentType extends ResolversParentTypes['Backdrop'] = ResolversParentTypes['Backdrop']> = {
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  file_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  iso_639_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigStringIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigStringInt'], any> {
  name: 'BigStringInt';
}

export type CastResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cast'] = ResolversParentTypes['Cast']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  cast_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  character?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  credit_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  known_for_department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  original_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CastMapResolvers<ContextType = any, ParentType extends ResolversParentTypes['CastMap'] = ResolversParentTypes['CastMap']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<Array<Maybe<ResolversTypes['PeopleCast']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CombinedCreditsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CombinedCredits'] = ResolversParentTypes['CombinedCredits']> = {
  cast?: Resolver<Maybe<Array<Maybe<ResolversTypes['PeopleCast']>>>, ParentType, ContextType>;
  crew?: Resolver<Maybe<Array<Maybe<ResolversTypes['PeopleCrew']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanySearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanySearchResult'] = ResolversParentTypes['CompanySearchResult']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  result?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatedByResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedBy'] = ResolversParentTypes['CreatedBy']> = {
  credit_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Credits'] = ResolversParentTypes['Credits']> = {
  cast?: Resolver<Array<Maybe<ResolversTypes['Cast']>>, ParentType, ContextType>;
  crew?: Resolver<Array<Maybe<ResolversTypes['Crew']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditsUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreditsUnion'] = ResolversParentTypes['CreditsUnion']> = {
  __resolveType: TypeResolveFn<'CombinedCredits' | 'FormattedCombinedCredits', ParentType, ContextType>;
};

export type CrewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Crew'] = ResolversParentTypes['Crew']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  credit_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  job?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  known_for_department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dates'] = ResolversParentTypes['Dates']> = {
  maximum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minimum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DepartmentMapResolvers<ContextType = any, ParentType extends ResolversParentTypes['DepartmentMap'] = ResolversParentTypes['DepartmentMap']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<Array<Maybe<ResolversTypes['PeopleCrew']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crew?: Resolver<Maybe<ResolversTypes['PeopleCrew']>, ParentType, ContextType>;
  episode_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  still_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeDetailResolvers<ContextType = any, ParentType extends ResolversParentTypes['EpisodeDetail'] = ResolversParentTypes['EpisodeDetail']> = {
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crew?: Resolver<Maybe<Array<Maybe<ResolversTypes['Crew']>>>, ParentType, ContextType>;
  crew_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  guest_stars?: Resolver<Maybe<Array<Maybe<ResolversTypes['Cast']>>>, ParentType, ContextType>;
  guest_stars_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production_code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  still_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExternalIdsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalIds'] = ResolversParentTypes['ExternalIds']> = {
  facebook_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imdb_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormattedCombinedCreditsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FormattedCombinedCredits'] = ResolversParentTypes['FormattedCombinedCredits']> = {
  cast?: Resolver<Maybe<Array<Maybe<ResolversTypes['CastMap']>>>, ParentType, ContextType>;
  crew?: Resolver<Maybe<Array<Maybe<ResolversTypes['DepartmentMap']>>>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreResolvers<ContextType = any, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeywordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Keyword'] = ResolversParentTypes['Keyword']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LangMapResolvers<ContextType = any, ParentType extends ResolversParentTypes['LangMap'] = ResolversParentTypes['LangMap']> = {
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaImages'] = ResolversParentTypes['MediaImages']> = {
  backdropLanguageMap?: Resolver<Maybe<Array<Maybe<ResolversTypes['LangMap']>>>, ParentType, ContextType>;
  backdrops?: Resolver<Maybe<Array<Maybe<ResolversTypes['Backdrop']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posterLanguageMap?: Resolver<Maybe<Array<Maybe<ResolversTypes['LangMap']>>>, ParentType, ContextType>;
  posters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Backdrop']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaMapResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaMap'] = ResolversParentTypes['MediaMap']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<Array<Maybe<ResolversTypes['MediaVideo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaTypeUnionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaTypeUnion'] = ResolversParentTypes['MediaTypeUnion']> = {
  __resolveType: TypeResolveFn<'SpecificMedia' | 'videoMedia', ParentType, ContextType>;
};

export type MediaVideoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaVideo'] = ResolversParentTypes['MediaVideo']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iso_639_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iso_3166_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  official?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  site?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieDetails'] = ResolversParentTypes['MovieDetails']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  budget?: Resolver<ResolversTypes['BigStringInt'], ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['Genre']>>>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imdb_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production_companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductionCompanies']>>>, ParentType, ContextType>;
  production_countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductionCountries']>>>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  revenue?: Resolver<Maybe<ResolversTypes['BigStringInt']>, ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  spoken_languages?: Resolver<Maybe<Array<Maybe<ResolversTypes['SpokenLanguages']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieKeywordsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MovieKeywords'] = ResolversParentTypes['MovieKeywords']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NetworkResolvers<ContextType = any, ParentType extends ResolversParentTypes['Network'] = ResolversParentTypes['Network']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin_country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NowPlayingResolvers<ContextType = any, ParentType extends ResolversParentTypes['NowPlaying'] = ResolversParentTypes['NowPlaying']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NowPlayingMoviesResolvers<ContextType = any, ParentType extends ResolversParentTypes['NowPlayingMovies'] = ResolversParentTypes['NowPlayingMovies']> = {
  dates?: Resolver<Maybe<ResolversTypes['Dates']>, ParentType, ContextType>;
  nowPlaying?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlaying']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NowPlayingTvResolvers<ContextType = any, ParentType extends ResolversParentTypes['NowPlayingTv'] = ResolversParentTypes['NowPlayingTv']> = {
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_string?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  showname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NowPopularCompleteResolvers<ContextType = any, ParentType extends ResolversParentTypes['NowPopularComplete'] = ResolversParentTypes['NowPopularComplete']> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlaying']>>>, ParentType, ContextType>;
  total_pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeopleResolvers<ContextType = any, ParentType extends ResolversParentTypes['People'] = ResolversParentTypes['People']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  known_for?: Resolver<Maybe<ResolversTypes['Recommendation']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeopleCastResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleCast'] = ResolversParentTypes['PeopleCast']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeopleCrewResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleCrew'] = ResolversParentTypes['PeopleCrew']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  credit_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  job?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  media_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeopleDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleDetails'] = ResolversParentTypes['PeopleDetails']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  also_known_as?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  biography?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deathday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imdb_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  known_for_department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  place_of_birth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  profile_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeopleImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleImages'] = ResolversParentTypes['PeopleImages']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  profiles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Backdrop']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PeopleResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PeopleResult'] = ResolversParentTypes['PeopleResult']> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  result?: Resolver<Maybe<Array<Maybe<ResolversTypes['People']>>>, ParentType, ContextType>;
  total_pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductionCompaniesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionCompanies'] = ResolversParentTypes['ProductionCompanies']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin_country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductionCountriesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionCountries'] = ResolversParentTypes['ProductionCountries']> = {
  iso_3166_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProviderInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProviderInfo'] = ResolversParentTypes['ProviderInfo']> = {
  display_priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  provider_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Search?: Resolver<Maybe<ResolversTypes['Search']>, ParentType, ContextType, Partial<QuerySearchArgs>>;
  SearchCollection?: Resolver<Maybe<ResolversTypes['SearchCollection']>, ParentType, ContextType, RequireFields<QuerySearchCollectionArgs, 'query'>>;
  SearchKeywords?: Resolver<Maybe<ResolversTypes['SearchKeyword']>, ParentType, ContextType, RequireFields<QuerySearchKeywordsArgs, 'query'>>;
  TvEpisodeDetail?: Resolver<Maybe<ResolversTypes['EpisodeDetail']>, ParentType, ContextType, RequireFields<QueryTvEpisodeDetailArgs, 'episode_number' | 'id' | 'season_number'>>;
  TvEpisodes?: Resolver<Maybe<ResolversTypes['SeasonEpisodes']>, ParentType, ContextType, RequireFields<QueryTvEpisodesArgs, 'id' | 'season_number'>>;
  WatchProvidersQuery?: Resolver<Maybe<ResolversTypes['WatchProviders']>, ParentType, ContextType, RequireFields<QueryWatchProvidersQueryArgs, 'id' | 'media_type'>>;
  getCast?: Resolver<Maybe<ResolversTypes['Credits']>, ParentType, ContextType, RequireFields<QueryGetCastArgs, 'id' | 'mediaType'>>;
  getExternalIDs?: Resolver<Maybe<ResolversTypes['ExternalIds']>, ParentType, ContextType, RequireFields<QueryGetExternalIDsArgs, 'id' | 'sourceMedia'>>;
  getImageMedia?: Resolver<Maybe<ResolversTypes['MediaImages']>, ParentType, ContextType, RequireFields<QueryGetImageMediaArgs, 'id' | 'sourceMedia'>>;
  getKeywords?: Resolver<Maybe<ResolversTypes['MovieKeywords']>, ParentType, ContextType, RequireFields<QueryGetKeywordsArgs, 'id' | 'mediaType'>>;
  getMovieDetails?: Resolver<Maybe<ResolversTypes['MovieDetails']>, ParentType, ContextType, RequireFields<QueryGetMovieDetailsArgs, 'id'>>;
  getPeopleCredit?: Resolver<Maybe<ResolversTypes['CreditsUnion']>, ParentType, ContextType, RequireFields<QueryGetPeopleCreditArgs, 'format' | 'id'>>;
  getPeopleExternalIDs?: Resolver<Maybe<ResolversTypes['ExternalIds']>, ParentType, ContextType, RequireFields<QueryGetPeopleExternalIDsArgs, 'id'>>;
  getPeopleImages?: Resolver<Maybe<ResolversTypes['PeopleImages']>, ParentType, ContextType, RequireFields<QueryGetPeopleImagesArgs, 'id'>>;
  getPoplarTv?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlayingTv']>>>, ParentType, ContextType>;
  getPopularMovies?: Resolver<Maybe<ResolversTypes['NowPopularComplete']>, ParentType, ContextType, Partial<QueryGetPopularMoviesArgs>>;
  getSimilarMovies?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlaying']>>>, ParentType, ContextType, RequireFields<QueryGetSimilarMoviesArgs, 'id'>>;
  getTvDetails?: Resolver<Maybe<ResolversTypes['TvDetails']>, ParentType, ContextType, RequireFields<QueryGetTvDetailsArgs, 'id'>>;
  getVideoMedia?: Resolver<Maybe<ResolversTypes['MediaTypeUnion']>, ParentType, ContextType, RequireFields<QueryGetVideoMediaArgs, 'id' | 'sourceMedia'>>;
  getrecommendations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Recommendation']>>>, ParentType, ContextType, RequireFields<QueryGetrecommendationsArgs, 'id' | 'sourceMedia'>>;
  nowPlayingMovies?: Resolver<Maybe<ResolversTypes['NowPlayingMovies']>, ParentType, ContextType>;
  nowPlayingTv?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlayingTv']>>>, ParentType, ContextType>;
  peopleDetails?: Resolver<Maybe<ResolversTypes['PeopleDetails']>, ParentType, ContextType, RequireFields<QueryPeopleDetailsArgs, 'id'>>;
  searchCompany?: Resolver<Maybe<ResolversTypes['CompanySearchResult']>, ParentType, ContextType, RequireFields<QuerySearchCompanyArgs, 'query'>>;
  searchMoviesOrTv?: Resolver<Maybe<ResolversTypes['SearchResultsMovieOrTv']>, ParentType, ContextType, RequireFields<QuerySearchMoviesOrTvArgs, 'mediaType' | 'query'>>;
  searchPeople?: Resolver<Maybe<ResolversTypes['PeopleResult']>, ParentType, ContextType, RequireFields<QuerySearchPeopleArgs, 'query'>>;
  topRatedMovies?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlaying']>>>, ParentType, ContextType>;
  topRatedTvShows?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlayingTv']>>>, ParentType, ContextType>;
  trending?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trending']>>>, ParentType, ContextType, Partial<QueryTrendingArgs>>;
  upcomingMovies?: Resolver<Maybe<ResolversTypes['NowPlayingMovies']>, ParentType, ContextType>;
};

export type RecommendationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recommendation'] = ResolversParentTypes['Recommendation']> = {
  __resolveType: TypeResolveFn<'NowPlaying' | 'NowPlayingTv', ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  rating?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  review?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  spolier?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Search'] = ResolversParentTypes['Search']> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchResult']>>>, ParentType, ContextType>;
  total_pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchCollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchCollection'] = ResolversParentTypes['SearchCollection']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Collection']>>>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchKeywordResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchKeyword'] = ResolversParentTypes['SearchKeyword']> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['Keyword']>>>, ParentType, ContextType>;
  total_pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResult'] = ResolversParentTypes['SearchResult']> = {
  __resolveType: TypeResolveFn<'NowPlaying' | 'NowPlayingTv' | 'People', ParentType, ContextType>;
};

export type SearchResultsMovieOrTvResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResultsMovieOrTv'] = ResolversParentTypes['SearchResultsMovieOrTv']> = {
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  result?: Resolver<Maybe<Array<Maybe<ResolversTypes['Recommendation']>>>, ParentType, ContextType>;
  total_pages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_results?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeasonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = {
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episode_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeasonEpisodesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SeasonEpisodes'] = ResolversParentTypes['SeasonEpisodes']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Episode']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  season_number?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpecificMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpecificMedia'] = ResolversParentTypes['SpecificMedia']> = {
  format?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  mediaMap?: Resolver<Maybe<Array<Maybe<ResolversTypes['MediaMap']>>>, ParentType, ContextType>;
  typeMedia?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpokenLanguagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['SpokenLanguages'] = ResolversParentTypes['SpokenLanguages']> = {
  iso_639_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trending'] = ResolversParentTypes['Trending']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  video?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  vote_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TvDetails'] = ResolversParentTypes['TvDetails']> = {
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_by?: Resolver<Maybe<ResolversTypes['CreatedBy']>, ParentType, ContextType>;
  episode_run_time?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  first_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<Maybe<ResolversTypes['Genre']>>>, ParentType, ContextType>;
  homepage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  in_production?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  languages?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  last_air_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  networks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Network']>>>, ParentType, ContextType>;
  number_of_episodes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  number_of_seasons?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  production_companies?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductionCompanies']>>>, ParentType, ContextType>;
  production_countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProductionCountries']>>>, ParentType, ContextType>;
  seasons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Season']>>>, ParentType, ContextType>;
  spoken_languages?: Resolver<Maybe<Array<Maybe<ResolversTypes['SpokenLanguages']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchProviderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['WatchProviderResult'] = ResolversParentTypes['WatchProviderResult']> = {
  buy?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProviderInfo']>>>, ParentType, ContextType>;
  flatrate?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProviderInfo']>>>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rent?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProviderInfo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchProvidersResolvers<ContextType = any, ParentType extends ResolversParentTypes['WatchProviders'] = ResolversParentTypes['WatchProviders']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  results?: Resolver<Maybe<Array<Maybe<ResolversTypes['WatchProvidersMap']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchProvidersMapResolvers<ContextType = any, ParentType extends ResolversParentTypes['WatchProvidersMap'] = ResolversParentTypes['WatchProvidersMap']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['WatchProviderResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoMediaResolvers<ContextType = any, ParentType extends ResolversParentTypes['videoMedia'] = ResolversParentTypes['videoMedia']> = {
  mediaVideo?: Resolver<Maybe<Array<Maybe<ResolversTypes['MediaVideo']>>>, ParentType, ContextType>;
  typeMap?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Backdrop?: BackdropResolvers<ContextType>;
  BigStringInt?: GraphQLScalarType;
  Cast?: CastResolvers<ContextType>;
  CastMap?: CastMapResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CombinedCredits?: CombinedCreditsResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CompanySearchResult?: CompanySearchResultResolvers<ContextType>;
  CreatedBy?: CreatedByResolvers<ContextType>;
  Credits?: CreditsResolvers<ContextType>;
  CreditsUnion?: CreditsUnionResolvers<ContextType>;
  Crew?: CrewResolvers<ContextType>;
  Dates?: DatesResolvers<ContextType>;
  DepartmentMap?: DepartmentMapResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  EpisodeDetail?: EpisodeDetailResolvers<ContextType>;
  ExternalIds?: ExternalIdsResolvers<ContextType>;
  FormattedCombinedCredits?: FormattedCombinedCreditsResolvers<ContextType>;
  Genre?: GenreResolvers<ContextType>;
  Keyword?: KeywordResolvers<ContextType>;
  LangMap?: LangMapResolvers<ContextType>;
  MediaImages?: MediaImagesResolvers<ContextType>;
  MediaMap?: MediaMapResolvers<ContextType>;
  MediaTypeUnion?: MediaTypeUnionResolvers<ContextType>;
  MediaVideo?: MediaVideoResolvers<ContextType>;
  MovieDetails?: MovieDetailsResolvers<ContextType>;
  MovieKeywords?: MovieKeywordsResolvers<ContextType>;
  Network?: NetworkResolvers<ContextType>;
  NowPlaying?: NowPlayingResolvers<ContextType>;
  NowPlayingMovies?: NowPlayingMoviesResolvers<ContextType>;
  NowPlayingTv?: NowPlayingTvResolvers<ContextType>;
  NowPopularComplete?: NowPopularCompleteResolvers<ContextType>;
  People?: PeopleResolvers<ContextType>;
  PeopleCast?: PeopleCastResolvers<ContextType>;
  PeopleCrew?: PeopleCrewResolvers<ContextType>;
  PeopleDetails?: PeopleDetailsResolvers<ContextType>;
  PeopleImages?: PeopleImagesResolvers<ContextType>;
  PeopleResult?: PeopleResultResolvers<ContextType>;
  ProductionCompanies?: ProductionCompaniesResolvers<ContextType>;
  ProductionCountries?: ProductionCountriesResolvers<ContextType>;
  ProviderInfo?: ProviderInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recommendation?: RecommendationResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  Search?: SearchResolvers<ContextType>;
  SearchCollection?: SearchCollectionResolvers<ContextType>;
  SearchKeyword?: SearchKeywordResolvers<ContextType>;
  SearchResult?: SearchResultResolvers<ContextType>;
  SearchResultsMovieOrTv?: SearchResultsMovieOrTvResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  SeasonEpisodes?: SeasonEpisodesResolvers<ContextType>;
  SpecificMedia?: SpecificMediaResolvers<ContextType>;
  SpokenLanguages?: SpokenLanguagesResolvers<ContextType>;
  Trending?: TrendingResolvers<ContextType>;
  TvDetails?: TvDetailsResolvers<ContextType>;
  WatchProviderResult?: WatchProviderResultResolvers<ContextType>;
  WatchProviders?: WatchProvidersResolvers<ContextType>;
  WatchProvidersMap?: WatchProvidersMapResolvers<ContextType>;
  videoMedia?: VideoMediaResolvers<ContextType>;
};


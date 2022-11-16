import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Backdrop = {
  __typename?: 'Backdrop';
  aspect_ratio?: Maybe<Scalars['Float']>;
  file_path?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  iso_639_1?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

/** Date type returned by NowPlaying Type */
export type Dates = {
  __typename?: 'Dates';
  maximum?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['String']>;
};

export type MediaImages = {
  __typename?: 'MediaImages';
  backdrops?: Maybe<Array<Maybe<Backdrop>>>;
  id: Scalars['ID'];
  posters?: Maybe<Array<Maybe<Backdrop>>>;
};

export enum MediaType {
  All = 'ALL',
  Movie = 'MOVIE',
  Person = 'PERSON',
  Tv = 'TV'
}

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

/** Describes the currently playing movies in theatre */
export type NowPlaying = {
  __typename?: 'NowPlaying';
  adult?: Maybe<Scalars['Boolean']>;
  backdrop_path?: Maybe<Scalars['String']>;
  genre_ids: Array<Maybe<Scalars['Int']>>;
  id: Scalars['ID'];
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
  name?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language?: Maybe<Scalars['String']>;
  original_string?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['Int']>;
  poster_path?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['Float']>;
  vote_count?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  getImageMedia?: Maybe<MediaImages>;
  getPoplarTv?: Maybe<Array<Maybe<NowPlayingTv>>>;
  getPopularMovies?: Maybe<Array<Maybe<NowPlaying>>>;
  getVideoMedia?: Maybe<Array<Maybe<MediaVideo>>>;
  nowPlayingMovies?: Maybe<NowPlayingMovies>;
  nowPlayingTv?: Maybe<Array<Maybe<NowPlayingTv>>>;
  topRatedMovies?: Maybe<Array<Maybe<NowPlaying>>>;
  topRatedTvShows?: Maybe<Array<Maybe<NowPlayingTv>>>;
  trending?: Maybe<Array<Maybe<Trending>>>;
  upcomingMovies?: Maybe<NowPlayingMovies>;
};


export type QueryGetImageMediaArgs = {
  id: Scalars['ID'];
  sourceMedia: SourceMedia;
};


export type QueryGetVideoMediaArgs = {
  id: Scalars['ID'];
  sourceMedia: SourceMedia;
};


export type QueryTrendingArgs = {
  mediaType?: InputMaybe<MediaType>;
  timeWindow?: InputMaybe<TimeWindow>;
};

export enum SourceMedia {
  Movie = 'MOVIE',
  Tv = 'TV'
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Dates: ResolverTypeWrapper<Dates>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MediaImages: ResolverTypeWrapper<MediaImages>;
  MediaType: MediaType;
  MediaVideo: ResolverTypeWrapper<MediaVideo>;
  NowPlaying: ResolverTypeWrapper<NowPlaying>;
  NowPlayingMovies: ResolverTypeWrapper<NowPlayingMovies>;
  NowPlayingTv: ResolverTypeWrapper<NowPlayingTv>;
  Query: ResolverTypeWrapper<{}>;
  SourceMedia: SourceMedia;
  String: ResolverTypeWrapper<Scalars['String']>;
  TimeWindow: TimeWindow;
  Trending: ResolverTypeWrapper<Trending>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Backdrop: Backdrop;
  Boolean: Scalars['Boolean'];
  Dates: Dates;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MediaImages: MediaImages;
  MediaVideo: MediaVideo;
  NowPlaying: NowPlaying;
  NowPlayingMovies: NowPlayingMovies;
  NowPlayingTv: NowPlayingTv;
  Query: {};
  String: Scalars['String'];
  Trending: Trending;
};

export type BackdropResolvers<ContextType = any, ParentType extends ResolversParentTypes['Backdrop'] = ResolversParentTypes['Backdrop']> = {
  aspect_ratio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  file_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  iso_639_1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dates'] = ResolversParentTypes['Dates']> = {
  maximum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minimum?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MediaImagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MediaImages'] = ResolversParentTypes['MediaImages']> = {
  backdrops?: Resolver<Maybe<Array<Maybe<ResolversTypes['Backdrop']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  posters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Backdrop']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type NowPlayingResolvers<ContextType = any, ParentType extends ResolversParentTypes['NowPlaying'] = ResolversParentTypes['NowPlaying']> = {
  adult?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  original_language?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  original_string?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  popularity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vote_average?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  vote_count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getImageMedia?: Resolver<Maybe<ResolversTypes['MediaImages']>, ParentType, ContextType, RequireFields<QueryGetImageMediaArgs, 'id' | 'sourceMedia'>>;
  getPoplarTv?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlayingTv']>>>, ParentType, ContextType>;
  getPopularMovies?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlaying']>>>, ParentType, ContextType>;
  getVideoMedia?: Resolver<Maybe<Array<Maybe<ResolversTypes['MediaVideo']>>>, ParentType, ContextType, RequireFields<QueryGetVideoMediaArgs, 'id' | 'sourceMedia'>>;
  nowPlayingMovies?: Resolver<Maybe<ResolversTypes['NowPlayingMovies']>, ParentType, ContextType>;
  nowPlayingTv?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlayingTv']>>>, ParentType, ContextType>;
  topRatedMovies?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlaying']>>>, ParentType, ContextType>;
  topRatedTvShows?: Resolver<Maybe<Array<Maybe<ResolversTypes['NowPlayingTv']>>>, ParentType, ContextType>;
  trending?: Resolver<Maybe<Array<Maybe<ResolversTypes['Trending']>>>, ParentType, ContextType, Partial<QueryTrendingArgs>>;
  upcomingMovies?: Resolver<Maybe<ResolversTypes['NowPlayingMovies']>, ParentType, ContextType>;
};

export type TrendingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trending'] = ResolversParentTypes['Trending']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  backdrop_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre_ids?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type Resolvers<ContextType = any> = {
  Backdrop?: BackdropResolvers<ContextType>;
  Dates?: DatesResolvers<ContextType>;
  MediaImages?: MediaImagesResolvers<ContextType>;
  MediaVideo?: MediaVideoResolvers<ContextType>;
  NowPlaying?: NowPlayingResolvers<ContextType>;
  NowPlayingMovies?: NowPlayingMoviesResolvers<ContextType>;
  NowPlayingTv?: NowPlayingTvResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Trending?: TrendingResolvers<ContextType>;
};


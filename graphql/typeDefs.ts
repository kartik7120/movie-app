import { gql } from "@apollo/client";

export const typeDefs = gql` #graghql
enum MediaType {
  ALL
  MOVIE
  PERSON
  TV
}

enum TimeWindow {
  DAY
  WEEK
}

enum SourceMedia {
  MOVIE
  TV
}

enum Status {
  RUMORED
  PLANNED
  IN_PRODUCTION
  POST_PRODUCTION
  RELEASED
  CANCELED
}

scalar BigStringInt

"Get the daily or weekly trending items"
type Trending {
  page: Int! @deprecated(reason: "Not being used")
  poster_path: String
  adult: Boolean!
  overview: String!
  release_date: String
  genre_ids: [Int]!
  id: Int!
  original_title: String
  name: String
  original_language: String!
  title: String
  backdrop_path: String
  popularity: Int!
  vote_count: Int!
  video: Boolean
  total_pages: Int!
  total_results: Int!
}
"Date type returned by NowPlaying Type"
type Dates {
  maximum: String
  minimum: String
}
"Describes the currently playing movies in theatre"
type NowPlaying {
  poster_path: String
  adult: Boolean
  overview: String
  release_date: String
  genre_ids: [Int]!
  id: ID!
  media_type: String
  original_title: String
  original_language: String
  title: String
  backdrop_path: String
  popularity: Int
  vote_count: Int
  video: Boolean
  vote_average: Float
}
"Describes the currently streaming TV shows"
type NowPlayingTv {
  poster_path: String
  popularity: Int
  id: ID!
  backdrop_path: String
  media_type: String
  vote_average: Float
  overview: String
  first_air_date: String
  origin_country: [String]
  genre_ids: [Int]
  original_language: String
  vote_count: Float
  name: String
  original_string: String
  showname: String
}

type NowPlayingMovies {
  page: Int
  nowPlaying: [NowPlaying]
  dates: Dates
  total_pages: Int
  total_results: Int
}

type MediaVideo {
  # id:ID!
  iso_639_1: String
  iso_3166_1: String
  name: String
  key: String
  site: String
  size: Int
  type: String
  official: Boolean
  publishedAt: String
  id: String
}

type MediaMap {
  key: String
  value: [MediaVideo]
}

type SpecificMedia {
  mediaMap: [MediaMap]
  typeMedia: [String]
  format: Boolean
}

type Genre {
  id: ID!
  name: String!
}

type ProductionCompanies {
  name: String!
  id: ID!
  logo_path: String
  origin_country: String!
}

type ProductionCountries {
  iso_3166_1: String!
  name: String!
}

type SpokenLanguages {
  iso_639_1: String
  name: String
}

type MovieDetails {
  adult: Boolean!
  backdrop_path: String
  # belongs_to_collection:
  budget: BigStringInt!
  genres: [Genre]
  homepage: String
  id: ID!
  imdb_id: String
  original_language: String
  original_title: String
  overview: String
  popularity: Int
  poster_path: String
  production_companies: [ProductionCompanies]
  production_countries: [ProductionCountries]
  release_date: String
  revenue: BigStringInt
  runtime: Int
  spoken_languages: [SpokenLanguages]
  status: Status
  tagline: String
  title: String!
  video: Boolean!
  vote_average: Float
  vote_count: Int
}

type CreatedBy {
  id: ID!
  credit_id: String!
  name: String!
  gender: String!
  profile_path: String!
}

type Network {
  name: String!
  id: ID!
  logo_path: String!
  origin_country: String!
}

type Season {
  air_date: String
  episode_count: Int
  name: String
  overview: String
  poster_path: String
  season_number: Int
}

type TvDetails {
  backdrop_path: String
  created_by: CreatedBy
  episode_run_time: [Int]
  first_air_date: String
  genres: [Genre]
  homepage: String
  id: ID
  in_production: Boolean!
  languages: [String]!
  last_air_date: String
  name: String
  networks: [Network]
  number_of_episodes: Int
  number_of_seasons: Int
  origin_country: [String]
  original_language: String
  original_name: String
  overview: String
  popularity: Int
  production_companies: [ProductionCompanies]
  production_countries: [ProductionCountries]
  seasons: [Season]
  spoken_languages: [SpokenLanguages]
  status: String
  tagline: String
  type: String
  vote_average: Float
  vote_count: Int
}

type Cast {
  adult: Boolean!
  gender: Int
  id: Int!
  known_for_department: String!
  name: String!
  original_name: String!
  popularity: Int!
  profile_path: String
  cast_id: Int!
  character: String!
  credit_id: String!
  order: Int
}

type Crew {
  adult: Boolean!
  gender: Int
  id: Int!
  known_for_department: String!
  name: String!
  original_name: String!
  popularity: Int!
  profile_path: String
  credit_id: String!
  department: String!
  job: String!
}

type Credits {
  id: ID
  cast: [Cast]!
  crew: [Crew]!
}

type Backdrop {
  aspect_ratio: Float
  file_path: String
  height: Int
  iso_639_1: String
  vote_average: Float
  vote_count: Int
  width: Int
  language: String
}

type LangMap {
  key: String!
  value: String
}

type MediaImages {
  backdrops: [Backdrop]
  posters: [Backdrop]
  id: ID!
  posterLanguageMap: [LangMap]
  backdropLanguageMap: [LangMap]
}

type Keyword {
  id: ID!
  name: String!
}

type MovieKeywords {
  id: ID!
  keywords: [Keyword]
}

union Recommendation = NowPlaying | NowPlayingTv

type SearchResultsMovieOrTv {
  result: [Recommendation]
  total_results: Int
  total_pages: Int
  page: Int
}

type People {
  known_for: Recommendation
  name: String!
  adult: Boolean!
  popularity: Int!
  media_type: String
  profile_path: String
  id: ID!
}

type PeopleResult {
  total_results: Int
  total_pages: Int
  result: [People]
  results: [People]
  page: Int
}

type Company {
  id: ID!
  logo_path: String
  name: String
}

type Collection {
  id: ID!
  backdrop_path: String
  name: String!
  poster_path: String
}

type SearchCollection {
  page: Int!
  results: [Collection]
  total_pages: Int!
  total_results: Int!
}

type CompanySearchResult {
  page: Int!
  total_pages: Int!
  total_results: Int!
  result: [Company]
}

type PeopleImages {
  id: ID!
  profiles: [Backdrop]
}

type PeopleDetails {
  birthday: String
  known_for_department: String!
  deathday: String
  id: ID!
  name: String
  also_known_as: [String]
  gender: Int
  biography: String
  popularity: Int
  place_of_birth: String
  profile_path: String
  adult: Boolean
  homepage: String
  imdb_id: String
}

type ExternalIds {
  imdb_id: String
  facebook_id: String
  instagram_id: String
  twitter_id: String
  id: ID!
}

enum ImageType {
  POSTER
  BACKDROP
}

type PeopleCast {
  id: ID!
  original_language: String
  episode_count: Int
  overview: String
  origin_country: [String]
  original_name: String
  genre_ids: [Int]
  name: String
  media_type: String
  poster_path: String
  first_air_date: String
  vote_average: Float
  vote_count: Int
  character: String
  backdrop_path: String
  popularity: Int
  credit_id: String
  original_title: String
  video: Boolean
  release_date: String
  title: String
  adult: Boolean
}

type PeopleCrew {
  id: ID!
  department: String
  original_language: String
  episode_count: Int
  job: String
  overview: String
  origin_country: [String]
  original_name: String
  vote_count: Int
  name: String
  media_type: String
  popularity: Int
  credit_id: String
  backdrop_path: String
  first_air_date: String
  vote_average: Float
  genre_ids: [Int]
  poster_path: String
  original_title: String
  video: Boolean
  title: String
  adult: Boolean
  release_date: String
}

type CombinedCredits {
  cast: [PeopleCast]
  crew: [PeopleCrew]
  id: ID!
}

type DepartmentMap {
  key: String
  value: [PeopleCrew]
}

type CastMap {
  key: String
  value: [PeopleCast]
}

type FormattedCombinedCredits {
  crew: [DepartmentMap]
  cast: [CastMap]
  id: ID!
  format: Boolean
}

type videoMedia {
  mediaVideo: [MediaVideo]
  typeMap: [String]
}

union SearchResult = NowPlaying | NowPlayingTv | People

type Search {
  results: [SearchResult]
  page: Int
  total_results: Int
  total_pages: Int
}

type SearchKeyword {
  page: Int
  results: [Keyword]
  total_pages: Int
  total_results: Int
}

type ProviderInfo {
  display_priority: Int
  logo_path: String
  provider_id: Int
  provider_name: String
}

type WatchProviderResult {
  link: String
  flatrate: [ProviderInfo]
  buy: [ProviderInfo]
  rent: [ProviderInfo]
}

type WatchProvidersMap {
  key: String
  value: WatchProviderResult
}

type WatchProviders {
  id: Int
  results: [WatchProvidersMap]
}

type Episode {
  air_date: String
  episode_number: Int
  crew: PeopleCrew
  id: Int
  name: String
  overview: String
  production_code: String
  season_number: Int
  still_path: String
  vote_average: Int
  vote_count: Int
}

type SeasonEpisodes {
  _id: String
  air_date: String
  episodes: [Episode]
  name: String
  overview: String
  id: Int
  poster_path: String
  season_number: Int
}

type EpisodeDetail {
  air_date: String
  crew: [Crew]
  guest_stars: [Cast]
  name: String
  overview: String
  id: ID
  production_code: String
  season_number: Int
  still_path: String
  vote_average: Float
  vote_count: Int
  crew_number: Int
  guest_stars_count: Int
}

type Review {
  rating: Int
  title: String!
  review: String!
  spolier: Boolean
}

union CreditsUnion = CombinedCredits | FormattedCombinedCredits

union MediaTypeUnion = videoMedia | SpecificMedia

type NowPopularComplete {
  page: Int
  results: [NowPlaying]
  total_pages: Int
  total_results: Int
}

type NowPopularCompleteTv {
  page: Int
  results: [NowPlayingTv]
  total_pages: Int
  total_results: Int
}

type Query {
  trending(mediaType: MediaType, timeWindow: TimeWindow): [Trending]
  nowPlayingMovies(page: Int): NowPlayingMovies
  upcomingMovies(page: Int): NowPlayingMovies
  nowPlayingTv(page: Int): NowPopularCompleteTv
  topRatedMovies(page: Int): [NowPlaying]
  topRatedTvShows: [NowPlayingTv]
  getVideoMedia(
    id: ID!
    sourceMedia: SourceMedia!
    include_type: String
  ): MediaTypeUnion
  getImageMedia(
    id: ID!
    sourceMedia: SourceMedia!
    first: Int
    includeLanguage: String
  ): MediaImages
  getPopularMovies(page: Int): NowPopularComplete
  getPoplarTv(page: Int): NowPopularCompleteTv
  getSimilarMovies(id: ID!, page: Int): [NowPlaying]
  getKeywords(id: ID!, mediaType: SourceMedia!): MovieKeywords
  getCast(id: ID!, mediaType: SourceMedia!, first: Int): Credits
  getrecommendations(
    id: ID!
    sourceMedia: SourceMedia!
    page: Int
  ): [Recommendation]
  getMovieDetails(id: ID!): MovieDetails
  getTvDetails(id: ID!): TvDetails
  searchMoviesOrTv(
    query: String!
    mediaType: SourceMedia!
    page: String
    include_adult: Boolean
    year: Int
    region: String
  ): SearchResultsMovieOrTv
  searchCompany(query: String!, page: Int): CompanySearchResult
  searchPeople(
    query: String!
    page: Int
    include_adult: Boolean
    region: String
  ): PeopleResult
  SearchCollection(
    query: String!
    page: Int
    language: String
  ): SearchCollection
  getPeopleImages(id: ID!, first: Int): PeopleImages
  peopleDetails(id: ID!): PeopleDetails
  getExternalIDs(id: ID!, sourceMedia: SourceMedia!): ExternalIds
  getPeopleCredit(id: ID!, format: Boolean!): CreditsUnion
  getPeopleExternalIDs(id: ID!): ExternalIds
  Search(query: String, page: String, language: String): Search
  SearchKeywords(query: String!, page: Int): SearchKeyword
  WatchProvidersQuery(
    id: Int!
    region: String
    media_type: MediaType!
  ): WatchProviders
  TvEpisodes(id: ID!, season_number: Int!): SeasonEpisodes
  TvEpisodeDetail(
    id: ID!
    season_number: Int!
    episode_number: Int!
  ): EpisodeDetail
  getPopularPeople(page: Int): PeopleResult
}
`;

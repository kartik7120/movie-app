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

    "Get the daily or weekly trending items"
    type Trending {
        page:Int! @deprecated(reason:"Not being used")
        poster_path:String
        adult:Boolean!
        overview:String!
        release_date:String
        genre_ids:[Int]!
        id:Int!
        original_title:String
        original_language:String!
        title:String
        backdrop_path:String
        popularity:Int!
        vote_count:Int!
        video:Boolean
        total_pages:Int!
        total_results:Int!
    }
    "Date type returned by NowPlaying Type"
    type Dates {
        maximum:String
        minimum:String
    }
    "Describes the currently playing movies in theatre"
    type NowPlaying {
        poster_path:String
        adult:Boolean
        overview:String
        release_date:String
        genre_ids:[Int]!
        id:ID!
        original_title:String
        original_language:String
        title:String
        backdrop_path:String
        popularity:Int
        vote_count:Int
        video:Boolean
        vote_average:Int
    }
    "Describes the currently streaming TV shows"
    type NowPlayingTv {
        poster_path:String
        popularity:Int
        id:ID!
        backdrop_path:String
        vote_average:Int
        overview:String
        first_air_date:String
        origin_country:[String]
        genre_ids:[Int]
        original_language:String
        vote_count:Int
        name:String
        original_string:String
    }

    type NowPlayingMovies {
        nowPlaying:[NowPlaying]
        dates:Dates
    }

    type Query {
        users: [User]
        trending(mediaType:MediaType,timeWindow:TimeWindow):[Trending]
        nowPlayingMovies:NowPlayingMovies
        upcomingMovies:NowPlayingMovies
        nowPlayingTv:[NowPlayingTv]
        topRatedMovies:[NowPlaying]
        topRatedTvShows:[NowPlayingTv]
    }
`;

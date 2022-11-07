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

    type User {
        name:String!
        id:ID
        password:String!
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

    type Dates {
        maximum:String
        minimum:String
    }

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

    type NowPlayingMovies {
        newPlaying:[NowPlaying]
        dates:Dates
    }

    type Query {
        users: [User]
        trending(mediaType:MediaType,timeWindow:TimeWindow):[Trending]
        nowPlayingMovies:NowPlayingMovies
    }
`;

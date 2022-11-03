import { gql } from "@apollo/client";
import { GraphQLObjectType, GraphQLScalarType } from "graphql";

export const typeDefs = gql` #graghql

    scaler mediaType
    scaler timeWindow

    type User {
        name:String!
        id:ID
        password:String!
    }

    "Get the daily or weekly trending items"
    type Trending {
        page:Int!
        poster_path:String
        adult:Boolean!
        overview:String!
        release_date:String!
        genre_id:[Int]!
        id:Int!
        original_title:String!
        original_language:String!
        title:String!
        backdrop_path:String
        popularity:Int!
        vote_count:Int!
        video:Boolean!
        total_pages:Int!
        total_results:Int!
    }

    type Query {
        users: [User]
        treading(mediaType:mediaType,timeWindow:timeWindow):Trending
    }
`

function mediaTypeFunction(mediaType: { mediaType: "all" | "movie" | "tv" | "person" }) {
    return mediaType
}

export const mediaType = new GraphQLScalarType({
    name: "mediaType",
    description: "Feild is used to set the range of the trediness that the user wants",
    serialize: () => mediaTypeFunction,
    parseValue: () => mediaTypeFunction
})
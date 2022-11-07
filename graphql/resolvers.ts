import axios from "axios";
import { GraphQLError } from "graphql";

export const resolvers = {
    MediaType: {
        ALL: "all",
        MOVIE: "movie",
        PERSON: "person",
        TV: "tv"
    },
    TimeWindow: {
        DAY: "day",
        WEEK: "week"
    },
    SourceMedia: {
        MOVIE: "movie",
        TV: "tv"
    },
    Query: {
        trending: async (parent: any, args: any, context: any, info: any) => {
            if (args.mediaType === undefined || args.mediaType === null) {
                throw new GraphQLError("mediaType is null or undefined");
            }
            const query2 = await fetch(`${process.env.API_URL!}trending/${args.mediaType}/${args.timeWindow}?api_key=${process.env.API_KEY}`);
            const query2Result = await query2.json();
            const result2 = query2Result.results;
            return result2;
        },
        nowPlayingMovies: async (parent: any, args: any, context: any, info: any) => {

            const query = await fetch(`${process.env.API_URL}movie/now_playing?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return {
                dates: result.dates,
                nowPlaying: result.results
            }
        },
        upcomingMovies: async (parent: any, args: any, context: any, info: any) => {
            const query = await fetch(`${process.env.API_URL}movie/upcoming?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return {
                dates: result.dates,
                nowPlaying: result.results
            }
        },
        nowPlayingTv: async (parent: any, args: any, context: any, info: any) => {
            const query = await fetch(`${process.env.API_URL}tv/on_the_air?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result.results;
        },
        topRatedMovies: async (parent: any, args: any, context: any, info: any) => {
            const query = await fetch(`${process.env.API_URL}movie/top_rated?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result.results;
        },
        topRatedTvShows: async (parent: any, args: any, context: any, info: any) => {
            const query = await fetch(`${process.env.API_URL}tv/top_rated?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result.results;
        },
        getVideoMedia: async (parent: any, args: any, context: any, info: any) => {
            // /movie/{movie_id}/videos
            if (args.id === undefined || args.id === null) {
                throw new GraphQLError("Please provide id of the media", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        status: 404
                    }
                })
            }

            if (args.sourceMedia === undefined || args.sourceMedia === null) {
                throw new GraphQLError("Please provide source media type", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        status: 404
                    }
                })
            }

            const query = await fetch(`${process.env.API_URL}${args.sourceMedia}/${args.id}/videos?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result.results;
        },
    }
}
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
    Status: {
        RUMORED: "Rumored",
        PLANNED: "Planned",
        IN_PRODUCTION: "In Production",
        POST_PRODUCTION: "Post Production",
        RELEASED: "Released",
        CANCELED: "Canceled"
    },
    Recommendation: {
        __resolveType: (obj: any, context: any, info: any) => {
            if (obj.name) {
                return `NowPlayingTv`;
            }

            if (obj.title) {
                return `NowPlaying`;
            }

            return null;
        },
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
        getImageMedia: async (parent: any, args: any, context: any, info: any) => {

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

            const query = await fetch(`${process.env.API_URL}${args.sourceMedia}/${args.id}/images?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result;
        },
        getPopularMovies: async (parent: any, args: any, context: any, info: any) => {

            const query = await fetch(`${process.env.API_URL}movie/popular?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result.results
        },
        getPoplarTv: async (parent: any, args: any, context: any, info: any) => {

            const query = await fetch(`${process.env.API_URL}tv/popular?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result.results
        },
        getSimilarMovies: async (parent: any, args: any, context: any, info: any) => {

            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Please provide id for the movie");
            }

            const query = await fetch(`${process.env.API_URL}movie/${args.id}/similar?api_key=${process.env.API_KEY}&page=${args.page || 1}`);
            const result = await query.json();

            return result.results;
        },
        getKeywords: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            if (args.mediaType === null || args.mediaType === undefined) {
                throw new GraphQLError("Provide media type");
            }

            const query = await fetch(`${process.env.API_URL}${args.mediaType}/${args.id}/keywords?api_key=${process.env.API_KEY}&page=${args.page || 1}`)
            const result = await query.json();

            if (args.mediaType === "tv") {
                return {
                    id: result.id,
                    keywords: result.results
                }
            }
            else
                return result;
        },
        getCast: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            if (args.mediaType === null || args.mediaType === undefined) {
                throw new GraphQLError("Provide media type");
            }

            const query = await fetch(`${process.env.API_URL}${args.mediaType}/${args.id}/credits?api_key=${process.env.API_KEY}`)
            const result = await query.json();
            return result;
        },
        getrecommendations: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            if (args.sourceMedia === null || args.sourceMedia === undefined) {
                throw new GraphQLError("Provide media type");
            }

            const query = await fetch(`${process.env.API_URL}${args.sourceMedia}/${args.id}/recommendations?api_key=${process.env.API_KEY}&page=${args.page || 1}`)
            const result = await query.json();
            return result.results;
        },
        getMovieDetails: async (parent: any, args: any, context: any, info: any) => {

            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            const query = await fetch(`${process.env.API_URL}movie/${args.id}?api_key=${process.env.API_KEY}`)
            const result = await query.json();
            return result;
        }
    },
}
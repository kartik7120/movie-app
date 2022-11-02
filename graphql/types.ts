import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema, // we'll use them for the RootQuery
    GraphQLList, // we'll use them for the RootQuery
    GraphQLID
} from 'graphql';

import axios from 'axios';

const NewMoviesType = new GraphQLObjectType({
    name: 'NewMovies',
    fields: {
        id: { type: GraphQLInt },
        poster_path: { type: GraphQLString },
        title: { type: GraphQLString },

    }
})

const VideoType = new GraphQLObjectType({
    name: 'Video',
    fields: {
        id: { type: GraphQLString },
        key: { type: GraphQLString }

    }
})

const MovieCreditsType = new GraphQLObjectType({
    name: 'MovieCredits',
    fields: {
        id: { type: GraphQLString },
        character: { type: GraphQLString },
        name: { type: GraphQLString },
        profile_path: { type: GraphQLString },
        order: { type: GraphQLString }
    }
})
const MovieReviewsType = new GraphQLObjectType({
    name: 'MovieReviews',
    fields: {
        id: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: GraphQLString },
    }
})

const MovieInfoType = new GraphQLObjectType({
    name: 'MovieInfo',
    fields: {
        id: { type: GraphQLString },
        overview: { type: GraphQLString },
        title: { type: GraphQLString },
        poster_path: { type: GraphQLString },
        genres: { type: GraphQLString },
        release_date: { type: GraphQLString },
        vote_average: { type: GraphQLString },
        production_companies: { type: GraphQLString },
        runtime: { type: GraphQLString },
        videos: {
            type: new GraphQLList(VideoType),
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`https://api.themoviedb.org/3/movie/${parentValue.id}/videos?api_key=${process.env.API}&language=en-US`)
                    .then(res => res.data.results)
            }
        },
        movieReviews: {
            type: new GraphQLList(MovieReviewsType),
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`https://api.themoviedb.org/3/movie/${parentValue.id}/reviews?api_key=${process.env.API}&language=en-US&page=1`)
                    .then(res => res.data.results)
            }
        },
        movieCredits: {
            type: new GraphQLList(MovieCreditsType),
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`https://api.themoviedb.org/3/movie/${parentValue.id}/credits?api_key=${process.env.API}&language=en-US&page=1`)
                    .then(res => res.data.cast.filter((cast: any) => cast.profile_path))
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        newMovies: {
            type: new GraphQLList(NewMoviesType),
            async resolve() {
                return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`)
                    .then((res) => {
                        const movies = res.data.results;
                        movies.map((movie: any) => movie.poster_path = "https://image.tmdb.org/t/p/w500" + movie.poster_path)
                        return movies;
                    })
            }
        },
        movieInfo: {
            type: MovieInfoType,
            args: { id: { type: GraphQLString } },
            async resolve(parentValue, args) {
                return axios.get(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.API}&language=en-US&page=1`)
                    .then(res => {
                        const movie = res.data;
                        movie.genres = movie.genres.map((g: any) => g.name).join(', ')
                        movie.production_companies = movie.production_companies.map((c: any) => c.name).join(', ')
                        movie.runtime += ' min.'
                        return movie;
                    })
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery
})
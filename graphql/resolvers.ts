import axios from "axios";
import { GraphQLError } from "graphql";
import { an } from "vitest/dist/types-71ccd11d";
import EpisodeInfo from "../components/EpisodeInfo";
import { convertCode } from "../lib/util";
import { PeopleCrew, CombinedCredits, Maybe, PeopleCast, SearchResult } from "../schemaTypes";
import { BigStringIntScaler } from "./customScalers";

export const resolvers = {
    BigStringInt: BigStringIntScaler,
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
    CreditsUnion: {
        __resolveType: (obj: any, context: any, info: any) => {
            if (obj.format === null || obj.format === undefined) {
                return 'CombinedCredits';
            }

            if (obj.format === true) {
                return 'FormattedCombinedCredits';
            }

            return null;
        }
    },
    MediaTypeUnion: {
        __resolveType: (obj: any, context: any, info: any) => {
            if (obj.format === null || obj.format === undefined) {
                return 'videoMedia';
            }

            if (obj.format === true) {
                return 'SpecificMedia';
            }

            return null;
        }
    },
    SearchResult: {
        __resolveType: (obj: any, context: any, info: any) => {

            if (obj.title !== undefined && obj.title !== null) {
                return 'NowPlaying';
            }

            if (obj.profile_path !== undefined && obj.profile_path !== null) {
                return 'People';
            }

            if (obj.name !== undefined && obj.name !== null) {
                return 'NowPlayingTv';
            }

            return null;
        }
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

            const query = await fetch(`${process.env.API_URL}movie/now_playing?api_key=${process.env.API_KEY}${args.page ? `&page=${args.page}` : ""}`);
            const result = await query.json();
            return {
                dates: result.dates,
                nowPlaying: result.results,
                total_pages: result.total_pages,
                total_results: result.total_results,
                page: result.page
            }
        },
        upcomingMovies: async (parent: any, args: any, context: any, info: any) => {
            const query = await fetch(`${process.env.API_URL}movie/upcoming?api_key=${process.env.API_KEY}${args.page ? `&page=${args.page}` : ""}`);
            const result = await query.json();
            return {
                dates: result.dates,
                nowPlaying: result.results,
                total_pages: result.total_pages,
                total_results: result.total_results,
                page: result.page
            }
        },
        nowPlayingTv: async (parent: any, args: any, context: any, info: any) => {
            const query = await fetch(`${process.env.API_URL}tv/on_the_air?api_key=${process.env.API_KEY}${args.page ? `&page=${args.page}` : ""}`);
            const result = await query.json();
            return {
                page: result.page,
                total_pages: result.total_pages,
                total_results: result.total_results,
                results: result.results
            };
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
            if (args.include_type === undefined || args.include_type === null) {
                const m = new Map<string, number>();

                result.results.map((ele: any) => {
                    if (m.has(ele.type) === false) {
                        m.set(ele.type, 1)
                    }
                })

                const arr: string[] = new Array<string>(0);
                m.forEach((value, key) => {
                    arr.push(key);
                })

                return {
                    mediaVideo: result.results,
                    typeMap: arr
                };
            }

            const arr: string[] = new Array(0);

            const m = new Map<string, any[]>();

            result.results.map((ele: any) => {
                if (m.has(ele.type) === false) {
                    m.set(ele.type, [ele])
                }
                else {
                    m.set(ele.type, [...m.get(ele.type)!, ele])
                }
            });

            const res = new Array<{ key: string, value: any[] }>(0);

            m.forEach((value, key) => {
                if (key === args.include_type)
                    res.push({
                        key,
                        value
                    })
                arr.push(key);
            });

            return {
                mediaMap: res,
                typeMedia: arr,
                format: true
            }
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

            const query2 = await fetch(`${process.env.API_URL}${args.sourceMedia}/${args.id}/images?api_key=${process.env.API_KEY}&include_image_language=${args.includeLanguage || null}`)
            const result2 = await query2.json();

            const m = new Map<string, string | null>();
            const m2 = new Map<string, string | null>();
            const PosterlangMap = new Array<{ key: string, value: string | null }>();
            const BackdroplangMap = new Array<{ key: string, value: string | null }>();

            result.backdrops.forEach((res: any) => {
                let temp = convertCode(res.iso_639_1);
                if (res.iso_639_1 === null || res.iso_639_1 === undefined) {
                    res.language = "No Language";
                    if (m2.has("No Language") === false) {
                        m2.set("No Language", null);
                    }
                }
                else {
                    if (m2.has(temp!) === false) {
                        m2.set(temp!, res.iso_639_1);
                    }
                    res.language = temp;
                }
            });

            result.posters.forEach((res: any) => {
                let temp = convertCode(res.iso_639_1);
                if (res.iso_639_1 === null || res.iso_639_1 === undefined) {
                    res.language = "No Language";
                    if (m.has("No Language") === false) {
                        m.set("No Language", null);
                    }
                }
                else {
                    if (m.has(temp!) === false) {
                        m.set(temp!, res.iso_639_1);
                    }
                    res.language = temp;
                }
            });

            m.forEach((value, key) => {
                PosterlangMap.push({ key, value })
            })

            m2.forEach((value, key) => {
                BackdroplangMap.push({ key, value })
            })

            if (args.first === undefined || args.first === null) {
                result2.PosterlangMap = PosterlangMap;
                result2.backdropLanguageMap = BackdroplangMap;
                return result2;
            }

            return {
                backdrops: result.backdrops.slice(0, args.first),
                posters: result.posters.slice(0, args.first),
                id: result.id,
                posterLanguageMap: PosterlangMap,
                backdropLanguageMap: BackdroplangMap
            }
        },
        getPopularMovies: async (parent: any, args: any, context: any, info: any) => {

            const query = await
                fetch(`${process.env.API_URL}movie/popular?api_key=${process.env.API_KEY}${args.page ? `&page=${args.page}` : ""}`);
            const result = await query.json();
            return result;
        },
        getPoplarTv: async (parent: any, args: any, context: any, info: any) => {

            const query = await fetch(`${process.env.API_URL}tv/popular?api_key=${process.env.API_KEY}${args.page ? `&page=${args.page}` : ""}`);
            const result = await query.json();
            return {
                page: result.page,
                total_pages: result.total_pages,
                total_results: result.total_results,
                results: result.results
            }
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

            const query = await fetch(`${process.env.API_URL}${args.mediaType}/${args.id}/credits?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            if (args.first === undefined || args.first === null) {
                return result;
            }
            return { ...result, cast: result.cast.slice(0, args.first), crew: result.crew.slice(0, args.first) };
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
            result.revenue = `${result.revenue}`;
            result.budget = `${result.revenue}`;
            return result;
        },
        getTvDetails: async (parent: any, args: any, context: any, info: any) => {

            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            const query = await fetch(`${process.env.API_URL}tv/${args.id}?api_key=${process.env.API_KEY}`)
            const result = await query.json();
            return result;
        },
        searchMoviesOrTv: async (parent: any, args: any, context: any, info: any) => {
            if (args.query === undefined || args.query === null) {
                throw new GraphQLError("Please provide the query to search");
            }

            if (args.mediaType === undefined || args.mediaType === null) {
                throw new GraphQLError("Please provide the query to search");
            }

            if (args.page !== undefined && args.page !== null) {
                if (isNaN(args.page) || isNaN(parseFloat(args.page))) {
                    throw new GraphQLError("Please provide valid page number for searching\n");
                }
            }

            const query = await fetch(`${process.env.API_URL}search/${args.mediaType}?api_key=${process.env.API_KEY}&page=${args.page || 1}&include_adult=${args.include_adult || true}&query=${args.query}`)
            const result = await query.json();
            return {
                result: result.results,
                total_pages: result.total_pages,
                total_results: result.total_results
            };
        },
        searchCompany: async (parent: any, args: any, context: any, info: any) => {

            if (args.query === undefined || args.query === null) {
                throw new GraphQLError("Please provide a query for searching");
            }

            const query = await fetch(`${process.env.API_URL}search/company?api_key=${process.env.API_KEY}&page=${args.page || 1}&query=${args.query}`)
            const result = await query.json();

            return {
                result: result.results,
                page: result.page,
                total_pages: result.total_pages,
                total_results: result.total_results
            }
        },
        searchPeople: async (parent: any, args: any, context: any, info: any) => {
            if (args.query === undefined || args.query === null) {
                throw new GraphQLError("Please provide a query for searching");
            }

            const query = await fetch(`${process.env.API_URL}search/person?api_key=${process.env.API_KEY}&page=${args.page || 1}&query=${args.query}`)
            const result = await query.json();

            return {
                total_result: result.total_result,
                total_pages: result.total_pages,
                result: result.results,
                page: result.page
            }
        },
        SearchCollection: async (parent: any, args: any, context: any, info: any) => {

            if (args.query === undefined || args.query === null) {
                throw new GraphQLError("Please provide a query for searching");
            }

            const query = await fetch(`${process.env.API_URL}search/collection?api_key=${process.env.API_KEY}&page=${args.page || 1}&query=${args.query}`)
            const result = await query.json();
            return {
                page: result.page,
                results: result.results,
                total_pages: result.total_pages,
                total_results: result.total_results
            }
        },
        getPeopleImages: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            const query = await fetch(`${process.env.API_URL}person/${args.id}/images?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            if (args.first === undefined || args.first === null) {
                return result;
            }

            return { profiles: result.profiles.slice(0, args.first) }
        },
        peopleDetails: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            const query = await fetch(`${process.env.API_URL}person/${args.id}?api_key=${process.env.API_KEY}`);
            const result = query.json();
            return result;
        },
        getExternalIDs: async (parent: any, args: any, context: any, info: any) => {

            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            if (args.sourceMedia === undefined || args.sourceMedia === null) {
                throw new GraphQLError("Provide source media type");
            }

            const query = await fetch(`${process.env.API_URL}${args.sourceMedia}/${args.id}/external_ids?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result;
        },
        getPeopleCredit: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            const query = await fetch(`${process.env.API_URL}person/${args.id}/combined_credits?api_key=${process.env.API_KEY}`);
            const result: CombinedCredits = await query.json();

            if (args.format === false)
                return result;

            let m = new Map<string, Maybe<PeopleCrew>[]>();

            result.crew?.forEach((ele) => {
                if (m.has(ele?.department!) === false) {
                    m.set(ele?.department!, [ele]);
                }
                else {
                    m.set(ele?.department!, [...m.get(ele?.department!)!, ele])
                }
            });

            let departmentMap = new Array<{ key: string, value: Maybe<PeopleCrew>[] }>(0);

            m.forEach((ele, key) => {
                ele.sort((a, b) => {
                    let date1 = a?.release_date || a?.first_air_date;
                    let date2 = b?.release_date || b?.first_air_date;
                    if (date1 === undefined) {
                        return +1;
                    }
                    else
                        if (date2 === undefined) {
                            return -1;
                        }
                    if (parseInt(date1?.substring(0, 4)!) < parseInt(date2?.substring(0, 4)!)) {
                        return -1;
                    }
                    return 0;
                })
                departmentMap.push({ key, value: ele });
            });

            let m1 = new Map<string, PeopleCast[]>();

            result.cast?.forEach((ele) => {
                if (m1.has("acting") === false) {
                    m1.set("acting", [ele as PeopleCast]);
                }
                else {
                    m1.set("acting", [...m1.get("acting")!, ele as PeopleCast])
                }
            });

            let castMap = new Array<{ key: string, value: PeopleCast[] }>(0);

            m1.forEach((ele, key) => {
                ele.sort((a, b) => {
                    let date1 = a?.release_date || a?.first_air_date;
                    let date2 = b?.release_date || b?.first_air_date;
                    if (date1 === undefined) {
                        return +1;
                    }
                    else
                        if (date2 === undefined) {
                            return -1;
                        }
                    if (parseInt(date1?.substring(0, 4)!) < parseInt(date2?.substring(0, 4)!)) {
                        return -1;
                    }
                    return 0;
                })
                castMap.push({ key, value: ele })
            });

            return {
                crew: departmentMap,
                cast: castMap,
                id: result.id,
                format: true
            };
        },
        getPeopleExternalIDs: async (parent: any, args: any, context: any, info: any) => {
            if (args.id === null || args.id === undefined) {
                throw new GraphQLError("Provide id");
            }

            const query = await fetch(`${process.env.API_URL}person/${args.id}/external_ids?api_key=${process.env.API_KEY}`);
            const result = await query.json();
            return result;
        },
        Search: async (parent: any, args: any, context: any, info: any) => {
            try {
                if (args.query === undefined || args.query === null) {
                    throw new GraphQLError("Please provide query for searching\n");
                }

                if (args.page !== undefined && args.page !== null) {
                    if (isNaN(args.page) || isNaN(parseFloat(args.page))) {
                        throw new GraphQLError("Please provide valid page number for searching\n");
                    }
                }

                const query = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${args.query}${args.page ? `&page=${args.page}` : ""}`);
                const result = await query.json();
                result.results.map((ele: any) => {
                    if (ele.first_air_date) {
                        ele.showname = ele.name
                    }
                })
                return result;

            } catch (error) {
                throw new GraphQLError("Some error occured while querying for results");
            }
        },
        SearchKeywords: async (parent: any, args: any, context: any, info: any) => {
            try {
                if (args.query === undefined || args.query === null) {
                    throw new GraphQLError("Please provide query for searching\n");
                }

                if (args.page !== undefined && args.page !== null) {
                    if (isNaN(args.page) || isNaN(parseFloat(args.page))) {
                        throw new GraphQLError("Please provide valid page number for searching\n");
                    }
                }

                const query = await fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${process.env.API_KEY}&query=${args.query}${args.page ? `&page=${args.page}` : ""}`);
                const result = await query.json();
                return result;

            } catch (error) {
                throw new GraphQLError("Some error occured while querying for results");
            }
        },
        WatchProvidersQuery: async (parent: any, args: any, context: any, info: any) => {
            try {

                if (args.id === null || args.id === undefined) {
                    throw new GraphQLError("Provide id");
                }

                if (args.media_type === null || args.media_type === undefined) {
                    throw new GraphQLError("Provide media type");
                }

                if (args.region !== undefined && args.region !== null) {
                    if (isNaN(args.region) || isNaN(parseFloat(args.region))) {
                        throw new GraphQLError("Please provide valid page number for searching\n");
                    }
                }

                const query = await fetch(`https://api.themoviedb.org/3/${args.media_type}/${args.id}/watch/providers?api_key=${process.env.API_KEY}`);
                const result = await query.json();

                let arr = new Array<{ key: string, value: any }>(0);

                for (const key in result.results) {
                    arr.push({ key, value: result.results[key] });
                }

                // console.log(arr)

                return {
                    id: result.id,
                    results: arr
                };

            } catch (error) {
                throw new GraphQLError("Some error occured while querying for watch providers");
            }
        },
        TvEpisodes: async (parent: any, args: any, context: any, info: any) => {
            try {

                if (args.id === null || args.id === undefined) {
                    throw new GraphQLError("Provide id");
                }

                if (args.season_number === null || args.season_number === undefined) {
                    throw new GraphQLError("Provide Season number");
                }

                const query = await fetch(`https://api.themoviedb.org/3/tv/${args.id}/season/${args.season_number}?api_key=${process.env.API_KEY}`)
                const result = await query.json();
                return result;

            } catch (error) {
                throw new GraphQLError("Some error occured while querying for episode provider");
            }
        },
        TvEpisodeDetail: async (parent: any, args: any, context: any, info: any) => {
            try {
                if (args.id === null || args.id === undefined) {
                    throw new GraphQLError("Provide id");
                }

                if (args.season_number === null || args.season_number === undefined) {
                    throw new GraphQLError("Provide Season number");
                }

                if (args.episode_number === null || args.episode_number === undefined) {
                    throw new GraphQLError("Provide episode number");
                }

                const query = await fetch(`https://api.themoviedb.org/3/tv/${args.id}/season/${args.season_number}/episode/${args.episode_number}?api_key=${process.env.API_KEY}`)
                const result = await query.json();
                result.crew_number = result.crew.length;
                result.guest_stars_count = result.guest_stars.length;
                return result;
            } catch (error) {
                throw new GraphQLError("Some error occured while querying for episode details");
            }
        }
    },
}
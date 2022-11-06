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
    Query: {
        users: () => [],
        trending: async (parent: any, args: any, context: any, info: any) => {
            if (args.mediaType === undefined || args.mediaType === null) {
                throw new GraphQLError("mediaType is null or undefined");
            }
            // const query = await axios.get(`${process.env.API_URL!}trending/${args.timeWindow}/${args.mediatype}`);
            // const result = query.data.results;
            const query2 = await fetch(`${process.env.API_URL!}trending/${args.mediaType}/${args.timeWindow}?api_key=35aa9d224935ab595e7f1d1d7a85bf92`);
            // https://api.themoviedb.org/3/trending/all/day?api_key=35aa9d224935ab595e7f1d1d7a85bf92
            const query2Result = await query2.json();
            const result2 = query2Result.results;
            // console.log(result); // how to perform this console.log in the console
            return result2;
        },
    },
    // Trending: {
    //     genre_id(parent: any) {
    //         return [parent.genre_id];
    //     }
    // }
}
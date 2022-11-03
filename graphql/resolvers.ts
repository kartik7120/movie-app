import { mediaType } from "./typeDefs";

export const resolvers = {
    media_type: mediaType,
    Query: {
        users: () => []
    }
}
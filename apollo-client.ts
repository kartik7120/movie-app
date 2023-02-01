import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getBaseUrl } from "./lib/util";

const client = new ApolloClient({
    uri: `https://movie-app-smoky-three.vercel.app/api/graphql`,
    cache: new InMemoryCache()
})

export default client;
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getBaseUrl } from "./lib/util";

const client = new ApolloClient({
    uri: `${getBaseUrl()}/api/graphql`,
    cache: new InMemoryCache()
})

export default client;
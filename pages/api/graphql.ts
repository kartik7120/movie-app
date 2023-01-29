import { typeDefs } from "../../graphql/typeDefs";
import { resolvers } from "../../graphql/resolvers";
import { readFileSync, readSync } from "fs";
import { ApolloServer } from "apollo-server-micro";
import { NextApiResponse, NextApiRequest } from "next";
import Cors from "cors";
import runMiddleware from "../../lib/middlewareCors";

const cors = Cors({
    methods: ['POST', 'GET', 'HEAD'],
})

export const config = {
    api: {
        bodyParser: false
    }
}

const server = new ApolloServer({
    context: ({ req }: { req: NextApiRequest }) => ({ req }),
    typeDefs,
    resolvers,
});

const startServer = server.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await runMiddleware(req, res, cors);

    await startServer;

    await server.createHandler({
        path: "/api/graphql"
    })(req, res)

    return;
}
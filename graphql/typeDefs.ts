import { gql } from "@apollo/client";

export const typeDefs = gql`
    type User {
        name:String!
        id:ID
        password:String!
    }

    type Query {
        users: [User]
    }
`
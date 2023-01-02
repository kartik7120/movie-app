import { GraphQLScalarType, Kind } from "graphql";

export const BigStringIntScaler = new GraphQLScalarType({
    name: "BigStringInt",
    description: "It converts a string value to an integer value",
    serialize(value: any) {
        return `${value}`
    },
    parseValue(value: any) {
        return `${value}`
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return `${ast.value}`
        }

        return null;
    }
})
import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";

const NOW_PLAYING_TV = gql` #graphql
    query GetPoplarTv {
     getPoplarTv {
        name
        id
        vote_average
        poster_path
    }
}
`

export default function PopularTv() {
    const { loading, data, error } = useQuery(NOW_PLAYING_TV, {
        onCompleted(data) {
            console.log(data);
        },
    })
    return <>
        <h1>I will render popular tv</h1>
        {data ? data.getPoplarTv.map((tv: any, index: number) => (
            <CardComponent key={Math.random() * index * 41} original_title={tv.name} poster_path={tv.poster_path} />
        )) : ""}
    </>
}
import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";

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
        <CarouselWrapper>
            {data ? data.getPoplarTv.map((tv: any, index: number) => (
                <Carousel.Slide key={Math.random() * index * 40}>
                    <CardComponent key={Math.random() * index * 41} original_title={tv.name} poster_path={tv.poster_path} />
                </Carousel.Slide>
            )) : ""}
        </CarouselWrapper>
    </>
}
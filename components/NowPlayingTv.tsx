import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";

const NOW_PLAYING_TV = gql` #graphql
    query NowPlayingTv {
    nowPlayingTv {
        id
        name
        poster_path
        vote_average
  }
}
`

export default function NowPlayingTv() {
    const { loading, data, error } = useQuery(NOW_PLAYING_TV);
    return <>
        <CarouselWrapper>
            {data ? data.nowPlayingTv.map((tv: any, index: number) => (
                <Carousel.Slide key={tv.id}>
                    <CardComponent original_title={tv.name} poster_path={tv.poster_path} />
                </Carousel.Slide>
            )) : ""}
        </CarouselWrapper>
    </>
}
import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";

const NOW_PLAYING_MOVIES = gql` #graphql
    query NowPlayingMovies {
    nowPlayingMovies {
     nowPlaying {
        id
        poster_path
        title
        vote_average
    }
  }
}
`

export default function NowPlayingMovies() {
    const { loading, data, error } = useQuery(NOW_PLAYING_MOVIES);
    return <>
        <CarouselWrapper>
            {data ? data.nowPlayingMovies.nowPlaying.map((tv: any, index: number) => (
                <Carousel.Slide key={tv.id}>
                    <CardComponent original_title={tv.title} poster_path={tv.poster_path} />
                </Carousel.Slide>
            )) : ""}
        </CarouselWrapper>
    </>
}
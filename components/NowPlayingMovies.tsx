import { useLazyQuery, useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { LoadingOverlay } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";
import React from "react";
import Link from "next/link";

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
    const containerRef = React.useRef<HTMLDivElement>();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    })
    const [getData, { loading, data, error, called }] = useLazyQuery(NOW_PLAYING_MOVIES);

    if (entry?.isIntersecting === true && called === false) {
        getData();
    }

    if (loading) {
        return <LoadingOverlay visible={true} overlayBlur={0} overlayOpacity={0} loaderProps={{ size: "lg", variant: "dots" }} />
    }

    return <>
        <CarouselWrapper>
            {data ? data.nowPlayingMovies.nowPlaying.map((movie: any, index: number) => (
                <Carousel.Slide key={movie.id}>

                    <Link href={`/movie/${movie.id}`}>
                        <CardComponent original_title={movie.title} poster_path={movie.poster_path} />
                    </Link>

                </Carousel.Slide>
            )) : ""}
        </CarouselWrapper>
        <span ref={ref}></span>
    </>
}
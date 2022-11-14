import { gql } from "apollo-server-micro";
import CardComponent from '../components/CardComponent';
import carosel from "../styles/carosel.module.css";
import { SegmentedControl } from '@mantine/core';
import { Carousel } from "@mantine/carousel";
import React from "react";
import { useQuery } from "@apollo/client";

const NOW_PLAYING = gql`
  query nowPlaying {
    getPopularMovies {
    # id
    original_title
    # vote_count
    # vote_average
    poster_path
    # adult
    # title
    # release_date
  }
}
`

export default function PopularMovies() {
    const { loading, data, error } = useQuery(NOW_PLAYING);

    return <Carousel breakpoints={[
        { maxWidth: 'md', slideSize: '25%' },
        { maxWidth: 'sm', slideSize: '50%', slideGap: 0 },
        { maxWidth: "xs", slideSize: "75%", slideGap: 0 }
    ]}
        sx={{ flex: 1 }} slidesToScroll={1} align="start" dragFree={true} withControls slideSize="20%">
        {data ? data.getPopularMovies.map((movie: any, index: number) => (
            <Carousel.Slide key={Math.random() * index * 45}>
                <CardComponent original_title={movie.original_title} poster_path={movie.poster_path} />
            </Carousel.Slide>
        )) : <Carousel.Slide>2</Carousel.Slide>
        }
    </Carousel>
}
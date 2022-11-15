import { gql } from "apollo-server-micro";
import CardComponent from '../components/CardComponent';
import { Carousel } from "@mantine/carousel";
import React from "react";
import { useQuery } from "@apollo/client";
import CarouselWrapper from "./CarouselComponent";

const NOW_PLAYING = gql`
  query nowPlaying {
    getPopularMovies {
    # id
    # original_title
    # vote_count
    # vote_average
    poster_path
    # adult
    title
    # release_date
  }
}
`

export default function PopularMovies(): JSX.Element {
  const { loading, data, error } = useQuery(NOW_PLAYING);

  return <CarouselWrapper>
    {data ? data.getPopularMovies.map((movie: any, index: number) => (
      <Carousel.Slide key={Math.random() * index * 45}>
        <CardComponent original_title={movie.title} poster_path={movie.poster_path} />
      </Carousel.Slide>
    )) : <Carousel.Slide>2</Carousel.Slide>
    }
  </CarouselWrapper>
}
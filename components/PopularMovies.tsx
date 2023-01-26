import { gql } from "apollo-server-micro";
import CardComponent from '../components/CardComponent';
import { Carousel } from "@mantine/carousel";
import { useQuery } from "@apollo/client";
import CarouselWrapper from "./CarouselComponent";
import { LoadingOverlay } from "@mantine/core";
import Link from "next/link";

const NOW_PLAYING = gql`
query GetPopularMovies($page: Int) {
  getPopularMovies(page: $page) {
    page
    results {
      id
      original_title
      poster_path
      title
      release_date
    }
    total_pages
  }
}
`

export default function PopularMovies(): JSX.Element {
  const { loading, data, error } = useQuery(NOW_PLAYING);

  if (loading) {
    return <LoadingOverlay visible={true} overlayBlur={0} overlayOpacity={0} loaderProps={{ size: "lg", variant: "dots" }} />
  }

  return <CarouselWrapper>
    {data ? data.getPopularMovies.results.map((movie: any, index: number) => (
      <Carousel.Slide key={Math.random() * index * 45}>
        <CardComponent media_type="movie" id={movie.id} original_title={movie.title} poster_path={movie.poster_path} />
      </Carousel.Slide>
    )) : <Carousel.Slide>2</Carousel.Slide>
    }
  </CarouselWrapper>
}
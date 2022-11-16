import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";

const TRENDING = gql`
    query trending($mediaType:)
`

export default function Trending(): JSX.Element {
    const { loading, data, error } = useQuery(TRENDING);

  return <CarouselWrapper>
    {data ? data.getPopularMovies.map((movie: any, index: number) => (
      <Carousel.Slide key={Math.random() * index * 45}>
        <CardComponent original_title={movie.title} poster_path={movie.poster_path} />
      </Carousel.Slide>
    )) : <Carousel.Slide>2</Carousel.Slide>
    }
  </CarouselWrapper>
}
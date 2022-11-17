import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";
import { Trending, MediaType, TimeWindow } from "../schemaTypes";
import { Loader, LoadingOverlay } from "@mantine/core";
interface Props {
    timeWindow: string
}

const TRENDING = gql`
    query Trending($mediaType: MediaType, $timeWindow: TimeWindow) {
  trending(mediaType: $mediaType, timeWindow: $timeWindow) {
    id
    poster_path
    title
  }
}
`

export default function TrendingComponent(props: Props): JSX.Element {
    const { loading, data, error } = useQuery(TRENDING, {
        variables: {
            mediaType: "ALL",
            timeWindow: props.timeWindow
        },
        fetchPolicy: "network-only",
    });

    if (loading) {
        return <LoadingOverlay visible={true} overlayBlur={0} overlayOpacity={0} loaderProps={{ size: "lg", variant: "dots" }} />
    }

    return <CarouselWrapper>
        {data ? data.trending.map((movie: any, index: number) => (
            <Carousel.Slide key={Math.random() * index * 37}>
                <CardComponent original_title={movie.title} poster_path={movie.poster_path} />
            </Carousel.Slide>
        )) : <LoadingOverlay visible={true} />
        }
    </CarouselWrapper>
}
import { useLazyQuery, useQuery, useApolloClient } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";
import { Trending, MediaType, TimeWindow } from "../schemaTypes";
import { Loader, LoadingOverlay } from "@mantine/core";
import { useIntersection } from '@mantine/hooks';

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

    const { ref, entry } = useIntersection({
        root: null,
        threshold: 1,
    })
    
    const [getData, { loading, data, error, called }] = useLazyQuery(TRENDING, {
        variables: {
            mediaType: "ALL",
            timeWindow: props.timeWindow
        },
        fetchPolicy: "cache-first",
    });

    if (entry?.isIntersecting === true && called === false) {
        getData();
    }

    if (loading) {
        return <LoadingOverlay visible={true} overlayBlur={0} overlayOpacity={0} loaderProps={{ size: "lg", variant: "dots" }} />
    }

    return <div ref={ref}>
        <CarouselWrapper>
            {data ? data.trending.map((movie: any, index: number) => (
                <Carousel.Slide ref={ref} key={Math.random() * index * 37}>
                    <CardComponent original_title={movie.title} poster_path={movie.poster_path} />
                </Carousel.Slide>
            )) : <LoadingOverlay visible={true} />
            }
        </CarouselWrapper>
    </div>
}
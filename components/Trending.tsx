import { useLazyQuery, useQuery, useApolloClient } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "apollo-server-micro";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";
import { Trending, MediaType, TimeWindow } from "../schemaTypes";
import { Loader, LoadingOverlay, SegmentedControl, Select } from "@mantine/core";
import { useIntersection } from '@mantine/hooks';
import React from "react";
import Link from "next/link";

interface Props {
    timeWindow: string
}

const TRENDING = gql`
    query Trending($mediaType: MediaType, $timeWindow: TimeWindow) {
  trending(mediaType: $mediaType, timeWindow: $timeWindow) {
    id
    poster_path
    title
    name
  }
}
`

type newType = "MOVIE" | "TV" | null

export default function TrendingComponent(props: Props): JSX.Element {

    const containerRef = React.useRef<HTMLDivElement>();
    const [value, setValue] = React.useState<newType>("MOVIE");

    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    })

    const [getData, { loading, data, error, called }] = useLazyQuery(TRENDING, {
        variables: {
            mediaType: "MOVIE",
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

    return <>
        <SegmentedControl
            value={value!} onChange={(value: string) => {
                setValue(value as newType);
                getData({
                    variables: {
                        mediaType: value,
                        timeWindow: props.timeWindow
                    }
                })
            }}
            data={
                [
                    {
                        value: "MOVIE", label: "Movie"
                    }, {
                        value: "TV", label: "Tv"
                    }
                ]
            } size="lg" color="yellow" />

        <CarouselWrapper>
            {data ? data.trending.map((movie: any, index: number) => (
                <Carousel.Slide key={Math.random() * index * 9876}>
                    <CardComponent media_type={value && value === "MOVIE" ? "movie" : "tv"} id={movie.id} original_title={movie.title || movie.name} poster_path={movie.poster_path} />
                </Carousel.Slide>
            )) : <LoadingOverlay visible={true} />
            }
        </CarouselWrapper>
        <span ref={ref}></span>
    </>
}
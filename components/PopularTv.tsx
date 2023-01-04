import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { LoadingOverlay } from "@mantine/core";
import { gql } from "apollo-server-micro";
import Link from "next/link";
import CardComponent from "./CardComponent";
import CarouselWrapper from "./CarouselComponent";

const NOW_PLAYING_TV = gql` #graphql
    query GetPoplarTv {
     getPoplarTv {
        name
        id
        vote_average
        poster_path
    }
}
`

export default function PopularTv() {
    const { loading, data, error } = useQuery(NOW_PLAYING_TV);

    if (loading) {
        return <LoadingOverlay visible={true} overlayBlur={0} overlayOpacity={0} loaderProps={{ size: "lg", variant: "dots" }} />
    }

    return <>
        <CarouselWrapper>
            {data ? data.getPoplarTv.map((tv: any, index: number) => (
                <Carousel.Slide key={Math.random() * index * 40}>

                    <Link href={`/tv/${tv.id}`}>
                        <CardComponent key={Math.random() * index * 41} original_title={tv.name} poster_path={tv.poster_path} />
                    </Link>

                </Carousel.Slide>
            )) : ""}
        </CarouselWrapper>
    </>
}
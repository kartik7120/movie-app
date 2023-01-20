import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";
import { Card, ScrollArea, Text } from "@mantine/core";
import styles from "../styles/movie.module.css";
import ImageCard from "./ImageCard";
import Link from "next/link";

const RECOMMENDATIONS = gql`
    query Getrecommendations($getrecommendationsId: ID!, $sourceMedia: SourceMedia!) {
  getrecommendations(id: $getrecommendationsId, sourceMedia: $sourceMedia) {
    ... on NowPlaying {
      title
      backdrop_path
      id
      release_date
    }
    ... on NowPlayingTv {
      first_air_date
      name
      backdrop_path
      id
    }
  }
}
`
interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV",
    page?: number
}

export default function Recommendation(props: Props): JSX.Element {


    const { loading, error, data } = useQuery(RECOMMENDATIONS, {
        variables: {
            getrecommendationsId: props.id,
            sourceMedia: props.sourceMedia,
            page: props.page
        }
    })

    if (loading) {
        return <p>Loading...</p>
    }

    return <ScrollArea style={{ width: "100%", height: "100%" }}>
        <div className={styles.videoWrapper}>
            {data && data.getrecommendations.map((ele: any) => {
                return <Link key={ele.id} href={props.sourceMedia === "MOVIE" ? `/movie/${ele.id}` : `/tv/${ele.id}`} title={`${ele.name}`}>
                    <ImageCard width={300} height={150} imgUrl={ele.backdrop_path} />
                    <Text lineClamp={1} variant="text">{props.sourceMedia === "MOVIE" ? ele.title : ele.name}</Text>
                    <Text lineClamp={1} variant="text">{props.sourceMedia === "MOVIE" ? ele.release_date : ele.first_air_date}</Text>
                </Link>
            })}
        </div>
    </ScrollArea>
}
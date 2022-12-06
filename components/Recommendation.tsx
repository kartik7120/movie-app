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

    return <ScrollArea style={{ width: 1000 }}>
        <div className={styles.videoWrapper}>
            {data && data.getrecommendations.map((ele: any) => {
                return <Link key={ele.id} href={`/movie/${ele.id}`} title={`${ele.title}`}>
                    <ImageCard width={300} height={150} imgUrl={ele.backdrop_path} />
                    <Text variant="text">{ele.title}</Text>
                    <Text variant="text">{ele.release_date}</Text>
                </Link>
            })}
        </div>
    </ScrollArea>
}
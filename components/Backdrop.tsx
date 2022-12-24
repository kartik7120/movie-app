import { useQuery } from "@apollo/client";
import { Button, ScrollArea } from "@mantine/core";
import { gql } from "apollo-server-micro";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "../styles/movie.module.css";
import { Image } from "@mantine/core";

const BACKDROP = gql`
    query GetImageMedia($getImageMediaId: ID!, $sourceMedia: SourceMedia!, $first: Int) {
  getImageMedia(id: $getImageMediaId, sourceMedia: $sourceMedia, first: $first) {
    backdrops {
      file_path
    }
    id
  }
}
`
interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV",
    first?: number
}


export default function Backdrops(props: Props): JSX.Element {

    const { loading, error, data } = useQuery(BACKDROP, {
        variables: {
            getImageMediaId: props.id,
            sourceMedia: props.sourceMedia,
            first: 7
        },
    })

    if (loading)
        return <p>Loading...</p>

    return <ScrollArea style={{ width: "100%", height: "100%" }}>
        <div className={styles.videoWrapper}>
            {data && data.getImageMedia.backdrops.map((img: any, index: number) => {
                return <Image key={Math.random() * index * 47} src={`https://image.tmdb.org/t/p/w400${img.file_path}?api_key=${process.env.API_KEY}`}
                    width="auto" alt="Poster" />
            })}
            <Button type="button" component="a" href={`/${props.sourceMedia.toLowerCase()}/${props.id}/images/backdrops`}
                rightIcon={<AiOutlineArrowRight />}>
                View More
            </Button>
        </div>
    </ScrollArea>
}
import { gql, useQuery } from "@apollo/client";
import { Button, ScrollArea } from "@mantine/core";
import Image from "next/image";
import styles from "../styles/movie.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";

const IMAGES = gql`
    query GetImageMedia($getImageMediaId: ID!, $sourceMedia: SourceMedia!, $first: Int) {
  getImageMedia(id: $getImageMediaId, sourceMedia: $sourceMedia, first: $first) {
    posters {
      file_path
    }
  }
}
`

interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV",
    first?: number
}

export default function Posters(props: Props): JSX.Element {

    const { loading, error, data } = useQuery(IMAGES, {
        variables: {
            getImageMediaId: props.id,
            sourceMedia: props.sourceMedia,
            first: 7
        },
    })

    if (loading)
        return <p>Loading...</p>

    return <ScrollArea style={{ width: 1000 }}>
        <div className={styles.videoWrapper}>
            {data && data.getImageMedia.posters.map((img: any, index: number) => {
                return <Image key={Math.random() * index * 47} src={`https://image.tmdb.org/t/p/w200${img.file_path}?api_key=${process.env.API_KEY}`}
                    width={200} height={300} alt="Poster" />
            })}
            <Button type="button" component="a" href={`/movie/${props.id}/images/posters`} rightIcon={<AiOutlineArrowRight />}>View More</Button>
        </div>
    </ScrollArea>
}
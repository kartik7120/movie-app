import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { AiOutlineArrowRight, AiOutlinePlayCircle } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import styles from "../styles/movie.module.css";
import { Button, ScrollArea } from "@mantine/core";
import Link from "next/link";

const VIDEOS = gql`
query GetVideoMedia($getVideoMediaId: ID!, $sourceMedia: SourceMedia!) {
  getVideoMedia(id: $getVideoMediaId, sourceMedia: $sourceMedia) {
    ... on videoMedia {
      typeMap
      mediaVideo {
        type
        id
        name
        key
        site
      }
    }
  }
}
`

interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV",
    first?: number
}

export default function Videos(props: Props): JSX.Element {

    const { loading, error, data } = useQuery(VIDEOS, {
        variables: {
            getVideoMediaId: props.id,
            sourceMedia: props.sourceMedia
        }
    })

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <ScrollArea style={{ width: "100%", height: "100%" }}>
            <div className={styles.videoWrapper}>
                {data && data.getVideoMedia.length <= 3 ? data.getVideoMedia.mediaVideo.map((video: any) => {
                    return <ReactPlayer key={video.id} width={350} height={200} controls={true} light={true} playIcon={<AiOutlinePlayCircle size={40} />}
                        url={`https://www.${video.site.toLowerCase()}.com/watch?v=${video.key}`} />
                }) : data.getVideoMedia.mediaVideo.slice(0, 3).map((video: any) => {
                    return <ReactPlayer key={video.id} width={350} height={200} controls={true} light={true} playIcon={<AiOutlinePlayCircle size={40} />}
                        url={`https://www.${video.site.toLowerCase()}.com/watch?v=${video.key}`} />
                })}
                <Link href={`/${props.sourceMedia.toLowerCase()}/${props.id}/images/videos?includeType=${data.getVideoMedia.typeMap[0]}`}><Button type="button" ml={10} rightIcon={<AiOutlineArrowRight />}>View More</Button></Link>
            </div>
        </ScrollArea>
    )
}
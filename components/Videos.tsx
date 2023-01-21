import { gql, useQuery } from "@apollo/client";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "../styles/movie.module.css";
import { Button, ScrollArea, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import Player from "./Player";

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
// <ReactPlayer controls={true} width={isMobile ? "100%" : undefined} url={`https://www.youtube.com/watch?v=${videos.getVideoMedia.mediaVideo.find((ele: any) => ele.type === "Trailer").key || null}`} />}

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

    return (<>
        {data && data.getVideoMedia.mediaVideo.length > 0 ? <ScrollArea style={{ width: "100%", height: "100%" }}>
            <div className={styles.wrapper4}>
                {data && data.getVideoMedia.mediaVideo.length <= 3 ? data.getVideoMedia.mediaVideo.map((video: any) => {
                    return <Player keyUrl={video.key} key={video.id} />
                }) : data.getVideoMedia.mediaVideo.slice(0, 3).map((video: any) => {
                    return <Player keyUrl={video.key} key={video.id} />
                })}
                <Link href={`/${props.sourceMedia.toLowerCase()}/${props.id}/images/videos?includeType=${data.getVideoMedia.typeMap[0]}`}><Button type="button" ml={10} rightIcon={<AiOutlineArrowRight />}>View More</Button></Link>
            </div>
        </ScrollArea> : <Text align="center">No video media has been added </Text>}
    </>
    )
}
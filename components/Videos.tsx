import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { AiOutlinePlayCircle } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import styles from "../styles/movie.module.css";

const VIDEOS = gql`
    query GetVideoMedia($getVideoMediaId: ID!, $sourceMedia: SourceMedia!) {
    getVideoMedia(id: $getVideoMediaId, sourceMedia: $sourceMedia) {
        key
        site
        id
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

    return (<div className={styles.videoWrapper}>
        {data && data.getVideoMedia.map((video: any) => {
            return <ReactPlayer key={video.id} playIcon={<AiOutlinePlayCircle />}
                url={`https://www.${video.site.toLowerCase()}.com/watch?v=${video.key}`} />
        })}
    </div>
    )
}
import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { Divider, Group, Text } from "@mantine/core"
import ImageCard from "./ImageCard"
import { TvDetails, MovieDetails } from "../schemaTypes";
import { runTimeConversion } from "../lib/util";
import styles from "../styles/watchList.module.css";
import Link from "next/link";
import { useEffect } from "react";

const MOVIE_DETAILS = gql`
query GetMovieDetails($getMovieDetailsId: ID!) {
  getMovieDetails(id: $getMovieDetailsId) {
    id
    title
    poster_path
    release_date
    runtime
    genres {
      name
      id
    }
    overview
    status
  }
}
`
const IMAGES = gql`
    query GetImageMedia($getImageMediaId: ID!, $sourceMedia: SourceMedia!, $first: Int) {
  getImageMedia(id: $getImageMediaId, sourceMedia: $sourceMedia, first: $first) {
    posters {
      file_path
    }
    id
  }
}
`

const TV_DETAILS = gql`
query GetTvDetails($getTvDetailsId: ID!) {
  getTvDetails(id: $getTvDetailsId) {
    id
    name
    episode_run_time
    first_air_date
    genres {
      id
      name
    }
    number_of_episodes
    overview
    status
  }
}
`

interface Props {
    id: string,
    mediaType: "MOVIE" | "TV",
}

export default function WatchListItem(props: Props): JSX.Element {

    const { data, loading, error } = useQuery<any>(props.mediaType === "MOVIE" ? MOVIE_DETAILS : TV_DETAILS, {
        variables: {
            getTvDetailsId: parseInt(props.id),
            getMovieDetailsId: parseInt(props.id)
        },
    });

    const [getImages, { data: posters }] = useLazyQuery(IMAGES, {
        variables: {
            getImageMediaId: props.id,
            sourceMedia: "TV",
            first: 1
        },
    })

    useEffect(() => {
        if (props.mediaType === "TV") {
            getImages();
        }
    }, [getImages, props.mediaType])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>error occured {`${error}`}</p>
    }

    return <div className={styles.wrapper}>
        <div>
            <Link href={`/${props.mediaType.toLowerCase()}/${props.id}`}>
                <ImageCard height={140} width={100}
                    imgUrl={props.mediaType === "MOVIE" ? data.getMovieDetails.poster_path
                        : posters && posters.getImageMedia.posters[0] && posters.getImageMedia.posters[0].file_path
                            ? posters.getImageMedia.posters[0].file_path : null} w="w200" />
            </Link>
        </div>
        <div className={styles.wrapper3}>
            <Link href={`/${props.mediaType.toLowerCase()}/${props.id}`}>
                <Text variant="text" size="xl" fw="bold">{data && props.mediaType === "MOVIE" ? data.getMovieDetails.title : data.getTvDetails.name}</Text>
            </Link>
            <Group>
                <Text variant="text">{props.mediaType.toLowerCase()}</Text>
                <Divider orientation="vertical" size="md" />
                {props.mediaType === "MOVIE" ? <Text variant="text">{runTimeConversion(data.getMovieDetails.runtime)}</Text> :
                    <Text>{data.getTvDetails.number_of_episodes} Episodes</Text>}
                {props.mediaType === "TV" ? <> <Divider orientation="vertical" size="md" />
                    <Text>{runTimeConversion(data.getTvDetails.episode_run_time)}</Text>
                </> : ""}
                <Divider orientation="vertical" size="md" />
                {props.mediaType === "TV" ? data.getTvDetails.genres.map((ele: any) => {
                    return <Text key={ele.id}>{`${ele.name} ,`}</Text>
                }) : ""}
                {props.mediaType === "MOVIE" ? data.getMovieDetails.genres.map((ele: any) => {
                    return <Text key={ele.id}>{`${ele.name} ,`}</Text>
                }) : ""}
            </Group>
            <Text lineClamp={3}>{props.mediaType === "MOVIE" ? data.getMovieDetails.overview : data.getTvDetails.overview}</Text>
        </div>
    </div>
}
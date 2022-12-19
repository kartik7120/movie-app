import { useMediaQuery } from "@mantine/hooks";
import Head from "next/head";
import LeftOptions from "../../../../components/LeftOptions";
import MoreTitle from "../../../../components/MoreTitle";
import PosterCard from "../../../../components/PosterCard";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { AiOutlineArrowRight, AiOutlinePlayCircle } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import styles from "../styles/movie.module.css";
import { Button, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { GetServerSideProps } from "next";
import client from "../../../../apollo-client";

const VIDEOS = gql`
    query GetVideoMedia(
  $getVideoMediaId: ID!
  $sourceMedia: SourceMedia!
  $includeType: String
) {
  getVideoMedia(
    id: $getVideoMediaId
    sourceMedia: $sourceMedia
    include_type: $includeType
  ) {
    ... on SpecificMedia {
      typeMedia
      mediaMap {
        key
        value {
          type
          id
          name
          key
        }
      }
    }
    ... on videoMedia {
      mediaVideo {
        type
        id
        name
        key
      }
      typeMap
    }
  }
}
`

interface Props {
    data: any[],
    typeMedia: string[]
}

export default function Videos(props: Props) {
    const matches = useMediaQuery('(max-width:530px)');
    return <>
        {/* <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <title>{props.title} - Backdrops</title>
        </Head>
        <MoreTitle id={props.id} title={`${props.title || "Movie Title"}`} />
        <div className={styles.wrapper}>
            <div className={styles.wrapper3}>
                <LeftOptions type="backdrops" id={props.id} title="Backdrops" list={props.languageMap} />
            </div>
            <div className={styles.wrapper2}>
                {props.backdrops.map((backdrop: any, index: number) => {
                    return <PosterCard width={matches === false ? 250 : 400} height={matches === false ? 100 : 150} imgURL={backdrop.file_path}
                        key={Math.random() * index * 9} size={`${backdrop.width} x ${backdrop.height} `} language={backdrop.iso_639_1} />
                })}
            </div>
        </div> */}
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;

    if (params && (params.id === undefined || params.id === null)) {
        return {
            notFound: true
        }
    }

    if (query.includeType === null || query.includeType === undefined) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: VIDEOS,
        variables: {
            getVideoMediaId: params ? params.id : null,
            sourceMedia: "MOVIE",
            includeType: query.includeType ? query.includeType : null
        },
        fetchPolicy: "cache-first",
    });

    if (data.getVideoMedia.typeMedia.includes(query.includeType) === false) {
        return {
            notFound: true
        }
    }

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            typeMedia: data.getVideoMedia.typeMedia,
            data: data.getVideoMedia.mediaMap
        }
    }

}
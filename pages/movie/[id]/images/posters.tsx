import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import client from "../../../../apollo-client";
import PosterCard from "../../../../components/PosterCard";
import styles from "../../../../styles/poster.module.css";
import LeftOptions from "../../../../components/LeftOptions";
import MoreTitle from "../../../../components/MoreTitle";
import ImageLayout from "../../../../components/ImageLayout";
import type { NextPageWithLayout } from '../../../_app';
import Head from "next/head";

const POSTERS = gql`
    query GetImageMedia($getImageMediaId: ID!, $sourceMedia: SourceMedia!) {
    getImageMedia(id: $getImageMediaId, sourceMedia: $sourceMedia) {
    posters {
      file_path
      aspect_ratio
      height
      width
      iso_639_1
    }
  }
  getMovieDetails(id:$getImageMediaId) {
    title
  }
}
`

interface Props {
    posters: any[],
    id: number | null,
    title: string
}

const Images = (props: Props) => {
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <title>{props.title} - Posters</title>
        </Head>
        <MoreTitle id={props.id} title={`${props.title || "Movie Title"}`} />
        <div className={styles.wrapper}>
            <div title="Dummy div">
                <LeftOptions title="Posters" list={props.posters} />
            </div>
            <div className={styles.wrapper2}>
                {props.posters.map((poster: any, index: number) => {
                    return <PosterCard imgURL={poster.file_path}
                        key={Math.random() * index * 9} size={`${poster.width} x ${poster.height}`} language={poster.iso_639_1} />
                })}
            </div>
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && (params.id === undefined || params.id === null)) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: POSTERS,
        variables: {
            getImageMediaId: params ? params.id : null,
            sourceMedia: "MOVIE",
            id: params ? params.id : null
        }
    })

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            posters: data.getImageMedia.posters,
            id: params ? params.id : null,
            title: data.getMovieDetails.title
        }
    }
}

export default Images;
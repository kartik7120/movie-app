import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import client from "../../../../apollo-client";
import LeftOptions from "../../../../components/LeftOptions";
import MoreTitle from "../../../../components/MoreTitle";
import PosterCard from "../../../../components/PosterCard";
import styles from "../../../../styles/poster.module.css";

const BACKDROPS = gql`
    query GetImageMedia($getImageMediaId: ID!, $sourceMedia: SourceMedia!, $includeLanguage: String) {
    getImageMedia(id: $getImageMediaId, sourceMedia: $sourceMedia, includeLanguage: $includeLanguage) {
    backdrops {
      file_path
      iso_639_1
      width
      height
    }
    backdropLanguageMap {
      key
      value
    }
  }
  getMovieDetails(id:$getImageMediaId) {
    title
  }
}
`

interface Props {
    backdrops: any[],
    id: number | null,
    title: string,
    languageMap: { key: string, value: string | null }[]
}

export default function BackDrops(props: Props) {
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <title>{props.title} - Backdrops</title>
        </Head>
        <MoreTitle id={props.id} title={`${props.title || "Movie Title"}`} />
        <div className={styles.wrapper}>
            <div title="Dummy div">
                <LeftOptions type="backdrops" id={props.id} title="Backdrops" list={props.languageMap} />
            </div>
            <div className={styles.wrapper2}>
                {props.backdrops.map((backdrop: any, index: number) => {
                    return <PosterCard width={250} height={100} imgURL={backdrop.file_path}
                        key={Math.random() * index * 9} size={`${backdrop.width} x ${backdrop.height} `} language={backdrop.iso_639_1} />
                })}
            </div>
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { params, query } = context;

    if (params && (params.id === undefined || params.id === null)) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: BACKDROPS,
        variables: {
            getImageMediaId: params ? params.id : null,
            sourceMedia: "MOVIE",
            id: params ? params.id : null,
            includeLanguage: query.include_language
        }
    })

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            backdrops: data.getImageMedia.backdrops,
            id: params ? params.id : null,
            title: data.getMovieDetails.title,
            languageMap: data.getImageMedia.backdropLanguageMap
        }
    }
}
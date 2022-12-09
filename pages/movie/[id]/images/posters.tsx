import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import client from "../../../../apollo-client";
import PosterCard from "../../../../components/PosterCard";
import styles from "../../../../styles/poster.module.css";
import LeftOptions from "../../../../components/LeftOptions";
import MoreTitle from "../../../../components/MoreTitle";
import ImageLayout from "../../../../components/ImageLayout";
import type { NextPageWithLayout } from '../../../_app';

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
}
`

interface Props {
    posters: any[],
    id: number | null
}

const Images = (props: Props) => {
    return <>
        <MoreTitle id={props.id} title={`Title`} />
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
            sourceMedia: "MOVIE"
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
            id: params ? params.id : null
        }
    }
}

export default Images;
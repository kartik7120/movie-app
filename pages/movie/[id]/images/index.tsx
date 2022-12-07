import { gql } from "@apollo/client"
import { GetStaticPaths, GetServerSideProps } from "next";
import client from "../../../../apollo-client";
import { Card } from "@mantine/core";
import PosterCard from "../../../../components/PosterCard";
import styles from "../../../../styles/poster.module.css";

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
    posters: any[]
}

export default function Images(props: Props): JSX.Element {
    return <div className={styles.wrapper}>
        {props.posters.map((poster: any, index: number) => {
            return <PosterCard imgURL={poster.file_path}
                key={Math.random() * index * 9} size={`${poster.width} x ${poster.height}`} language={poster.iso_639_1} />
        })}
    </div>
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
        }
    }
}
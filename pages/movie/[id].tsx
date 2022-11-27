import { gql } from "apollo-server-micro";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import styles from "../../styles/movie.module.css";
import React from "react";
import ImageCard from "../../components/ImageCard";
import { Text, Title } from "@mantine/core";
import Head from "next/head";
import { runTimeConversion, covertDataFormat } from "../../lib/util";

const MOVIE_DETAILS = gql`
query GetMovieDetails($getMovieDetailsId: ID!) {
  getMovieDetails(id: $getMovieDetailsId) {
    backdrop_path
    budget
    title
    release_date
    poster_path
    runtime
    revenue
    overview
    genres {
      name
    }
    original_language
    homepage
    status
    vote_average
    tagline
  }
}
`

export default function Media({ data, id }: { data: any, id: number }) {
    return <>
        <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.overview} />
        </Head>
        <div className={styles.wrapper}>
            <div>
                <ImageCard imgUrl={data.poster_path} title={data.title} />
                <Title order={1} m={0} size="h1">{data.title}</Title>
                <div className={styles.wrapper2}>
                    <Text variant="text" component="p" ml={5}>{covertDataFormat(data.release_date)}</Text>
                    <span>&#9679;</span>
                    <Text variant="text" >{data.genres.map((ele: { name: string }) => ele.name).join(",")}</Text>
                    <span>&#9679;</span>
                    <Text variant="text" component="span">{runTimeConversion(data.runtime)}</Text>
                </div>
                <Text component="p" fs="italic" weight="bold" size="lg" variant="text" >{data.tagline}</Text>
                <Title order={2} variant="text" >Overview</Title>
                <Text variant="text" component="p">{data.overview}</Text>
            </div>
            <div>Grid div</div>
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && !params.id) {
        return {
            notFound: true
        }
    }

    const result = await client.query({
        query: MOVIE_DETAILS,
        variables: {
            getMovieDetailsId: params ? params.id : null
        }
    })

    return {
        props: {
            data: result.data.getMovieDetails,
            id: params ? params.id : null
        },
    }
}

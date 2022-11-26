import { gql } from "apollo-server-micro";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import styles from "../../styles/movie.module.css";
import React from "react";
import ImageCard from "../../components/ImageCard";
import { Title } from "@mantine/core";
import Head from "next/head";

type data = {
    name: string
}
const MOVIE_DETAILS = gql`
query GetMovieDetails($getMovieDetailsId: ID!) {
  getMovieDetails(id: $getMovieDetailsId) {
    # backdrop_path
    # budget
    title
    # release_date
    poster_path
    # runtime
    # revenue
    # overview
    # genres {
    #   name
    # }
    # original_language
    # homepage
    # status
    # vote_average
    # tagline
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
                <Title order={1} size="h1">{data.title}</Title>
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

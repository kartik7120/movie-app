import { Button, Container, Divider, Group, Pagination, Text, Title } from "@mantine/core";
import { gql } from "apollo-server-micro";
import { collection, doc, DocumentData, getDocs, limit, onSnapshot, orderBy, query, QuerySnapshot, startAfter, startAt } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import client from "../../../apollo-client";
import MoreTitle from "../../../components/MoreTitle";
import Review from "../../../components/Review";
import ReviewComment from "../../../components/ReviewComment";
import { db } from "../../../firebase";
import { TvDetails } from "../../../schemaTypes";
import Head from "next/head";

interface Props {
    id: number | null,
    name: string,
    error?: any,
    data: TvDetails,
    posters: any[]
}

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
    
  }
}
`

export default function Reviews(props: Props) {
    const router = useRouter();
    const [state, setState] = React.useState<any[] | null>(null);
    const [start, setStart] = useState(10);
    const docRef = collection(db, "shows", `${router && router.query.id}`, "reviews");
    const q = query(docRef, orderBy("rating"), limit(start));

    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = new Array(0);
                snapshot.forEach((ele) => {
                    data.push({
                        id: ele.id,
                        ...ele.data()
                    });
                });
                setState(data);
            });
            return () => {
                unsubscribe();
            }
        } catch (error) {
            console.log(`error occured while making pagination = ${error}`);
        }
    }, [q, router.isReady])


    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{props.data.name} - Reviews</title>
        </Head>
        <MoreTitle sourceMedia="TV" id={props.id} title={`${props.data.name || "Movie Title"}`} />
        <Container fluid p={100} pt={0} pb={0}>
            <Title order={2} size="h1">User Reviews</Title>
            {props.id && <Review id={props.id} mediaType="movies" imgUrl={props.posters && props.posters[0] && props.posters[0].file_path ? props.posters[0].file_path : null} title={`${props.data.name}`} />}
            {state === null ? "Loading..." : state && state.map((ele) => {
                return <div key={ele.id}>
                    <ReviewComment mediaType="SHOWS" mediaId={`${props.id ? props.id : null}`} id={ele.id} rating={ele.rating} spolier={ele.spolier}
                        downvotes={ele.downvotes} upvotes={ele.upvotes} review={ele.review} title={ele.title} />
                    <Divider variant="dotted" size="lg" mt={10} mb={10} />
                </div>
            })}
            <Group position="center" mb={10}>
                <Button variant="outline" onClick={() => {
                    setStart((start) => start + 10);
                }}>
                    Load More
                </Button>
            </Group>
        </Container>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && (params.id === null || params.id === undefined)) {
        return {
            notFound: true
        }
    }

    try {
        const { data, error } = await client.query({
            query: TV_DETAILS,
            variables: {
                getTvDetailsId: params && params.id
            }
        })

        const { data: posters } = await client.query({
            query: IMAGES,
            variables: {
                getImageMediaId: params && params.id ? params.id : null,
                sourceMedia: "TV",
                first: 1
            }
        })

        if (error) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                id: params && params.id ? params.id : null,
                data: data.getTvDetails,
                posters: posters.getImageMedia.posters
            }
        }

    } catch (error) {
        console.log(`error occured while fetching reviews from the database = ${error}`);
    }

    return {
        notFound: true
    }
}
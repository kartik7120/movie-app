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
import { MovieDetails } from "../../../schemaTypes";
import Head from "next/head";

interface Props {
    id: number | null,
    title: string,
    error?: any
    data: MovieDetails
}

const MOVIE_DETAILS = gql`
    query GetMovieDetails($getMovieDetailsId: ID!) {
  getMovieDetails(id: $getMovieDetailsId) {
    id
    title
    poster_path
  }
}
`

export default function Reviews(props: Props) {
    const router = useRouter();
    const [state, setState] = React.useState<any[] | null>(null);
    const [start, setStart] = useState(10);
    const docRef = collection(db, "movies", `${router && router.query.id}`, "reviews");
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
            <title>{props.data.title} Reviews</title>
        </Head>
        <MoreTitle sourceMedia="MOVIE" id={props.id} title={`${props.data.title || "Movie Title"}`} />
        <Container fluid p={100} pt={0} pb={0}>
            <Title order={2} size="h1">User Reviews</Title>
            {props.id && <Review id={props.id} mediaType="movies" imgUrl={props.data.poster_path as string} title={props.data.title} />}
            {state === null ? "Loading..." : state && state.map((ele) => {
                return <>
                    <ReviewComment mediaId={`${props.id ? props.id : null}`} id={ele.id} rating={ele.rating} spolier={ele.spolier}
                        downvotes={ele.downvotes} upvotes={ele.upvotes} review={ele.review} title={ele.title} key={ele.id} />
                    <Divider variant="dotted" size="lg" mt={10} mb={10} />
                </>
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
            query: MOVIE_DETAILS,
            variables: {
                getMovieDetailsId: params && params.id
            }
        })

        if (error) {
            return {
                props: {
                    error
                }
            }
        }

        return {
            props: {
                id: params && params.id ? params.id : null,
                data: data.getMovieDetails
            }
        }

    } catch (error) {
        console.log(`error occured while fetching reviews from the database = ${error}`);
    }

    return {
        notFound: true
    }
}
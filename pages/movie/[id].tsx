import { gql } from "apollo-server-micro";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import styles from "../../styles/movie.module.css";
import React from "react";
import ImageCard from "../../components/ImageCard";
import { ActionIcon, Button, Divider, Text, Title } from "@mantine/core";
import Head from "next/head";
import { runTimeConversion, covertDataFormat } from "../../lib/util";
import { BackgroundImage, Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineHeart, AiOutlineUnorderedList, AiTwotoneStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { useLazyQuery } from "@apollo/client";
import ReactPlayer from "react-player/youtube";
import Cast from "../../components/Cast";
import MediaComponent from "../../components/MediaComponent";

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
    id
  }
}
`

const VIDEO_MEDIA = gql`
query GetVideoMedia($getVideoMediaId: ID!, $sourceMedia: SourceMedia!) {
  getVideoMedia(id: $getVideoMediaId, sourceMedia: $sourceMedia) {
    key
    site
    id
    official
    type
  }
}
`

export default function Media({ data, id }: { data: any, id: number }) {

    const [getVideo, { loading, data: videos, error }] = useLazyQuery(VIDEO_MEDIA, {
        variables: {
            getVideoMediaId: data.id,
            sourceMedia: "MOVIE"
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    })

    const [opened, setOpened] = React.useState(false);
    const theme = useMantineTheme();
    return <>
        <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.overview} />
        </Head>
        <Modal opened={opened} centered size="auto"
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.5}
            overlayBlur={3}
            exitTransitionDuration={100}
            closeOnClickOutside={false}
            onClose={() => setOpened(false)}>
            {videos &&
                <ReactPlayer controls={true} url={`https://www.youtube.com/watch?v=${videos.getVideoMedia.find((ele: any) => ele.type === "Trailer").key}`} />}
        </Modal>
        <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}?api_key=${process.env.API_KEY}`}
            className={styles.image}
        >
            <div className={styles.wrapper}>
                <div>
                    <ImageCard imgUrl={data.poster_path} title={data.title} width={320} height={440} />
                </div>
                <div className={styles.rightWrapper}>
                    <Title order={1} m={0} size="h1">{data.title}</Title>
                    <div className={styles.wrapper2}>
                        <Text variant="text" component="p" ml={5}>{covertDataFormat(data.release_date)}</Text>
                        <span>&#9679;</span>
                        <Text variant="text">{data.genres.map((ele: { name: string }) => ele.name).join(",")}</Text>
                        <span>&#9679;</span>
                        <Text variant="text" component="span">{runTimeConversion(data.runtime)}</Text>
                    </div>
                    <div className={styles.wrapper4}>
                        <ActionIcon size="xl" mr={5}>
                            <AiOutlineUnorderedList />
                        </ActionIcon>
                        <ActionIcon size="xl" mr={5}>
                            <AiOutlineHeart />
                        </ActionIcon>
                        <ActionIcon size="xl" mr={5}>
                            <BsBookmark />
                        </ActionIcon>
                        <ActionIcon size="xl" mr={5}>
                            <AiTwotoneStar />
                        </ActionIcon>
                        <Button variant="outline" onClick={() => {
                            setOpened(true);
                            getVideo();
                        }} color="blue">Play Tralier</Button>
                    </div>
                    <Text component="p" fs="italic" weight="bold" size="lg" variant="text" >{data.tagline}</Text>
                    <Title order={2} variant="text" >Overview</Title>
                    <Text variant="text" component="p">{data.overview}</Text>
                </div>
            </div>
        </BackgroundImage>
        <div className={styles.bottomWrapper}>
            <div className={styles.bottomWrapper2}>
                <Title order={2} size="h1" align="start"
                    style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                    Cast
                </Title>
                <Cast id={id} mediaType={"MOVIE"} first={7} />
                <Divider variant="solid" size="md" m={2} />
                <MediaComponent />
            </div>
            <div>
                Second column
            </div>
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

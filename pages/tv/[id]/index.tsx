import { gql, useLazyQuery } from "@apollo/client";
import { ActionIcon, BackgroundImage, Button, Divider, Modal, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { AiOutlineHeart, AiOutlineUnorderedList, AiTwotoneStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import ReactPlayer from "react-player";
import client from "../../../apollo-client";
import Cast from "../../../components/Cast";
import ImageCard from "../../../components/ImageCard";
import Keywords from "../../../components/Keywords";
import MediaComponent from "../../../components/MediaComponent";
import Recommendation from "../../../components/Recommendation";
import Social from "../../../components/Social";
import { convertCode, covertDataFormat, runTimeConversion } from "../../../lib/util";
import styles from "../../../styles/movie.module.css";
import { TvDetails } from "../../../schemaTypes";

const TV_DETAILS = gql`
    query GetTvDetails($getTvDetailsId: ID!) {
    getTvDetails(id: $getTvDetailsId) {
    first_air_date
    backdrop_path
    genres {
      name
      id
    }
    homepage
    id
    name
    number_of_episodes
    number_of_seasons
    original_language
    original_name
    origin_country
    tagline
    type
    spoken_languages {
      name
      iso_639_1
    }
    last_air_date
    overview
    networks {
      name
      id
      logo_path
    }
    seasons {
      poster_path
    }
  }
}
`
const VIDEO_MEDIA = gql`
query GetVideoMedia($getVideoMediaId: ID!, $sourceMedia: SourceMedia!) {
  getVideoMedia(id: $getVideoMediaId, sourceMedia: $sourceMedia) {
    ... on videoMedia {
      typeMap
      mediaVideo {
        type
        id
        name
        key
      }
    }
  }
}`

export default function Tv({ data, id, acceptLang }: { data: any, id: number, acceptLang: string }) {

    const [opened, setOpened] = React.useState(false);
    const theme = useMantineTheme();

    const isMobile = useMediaQuery('(max-width: 694px)');
    const isMobile2 = useMediaQuery('(max-width: 490px)');


    const [getVideo, { loading, data: videos, error }] = useLazyQuery(VIDEO_MEDIA, {
        variables: {
            getVideoMediaId: data.id,
            sourceMedia: "TV"
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });


    return <>
        <Head>
            <title>{data.name}</title>
            <meta name="description" content={data.overview} />
        </Head>
        <Modal opened={opened} centered size="auto" fullScreen={isMobile}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.5}
            overlayBlur={3}
            exitTransitionDuration={100}
            closeOnClickOutside={false}
            onClose={() => setOpened(false)}>
            {videos &&
                <ReactPlayer controls={true} width={isMobile ? "100%" : undefined} url={`https://www.youtube.com/watch?v=${videos.getVideoMedia.mediaVideo.find((ele: any) => ele.type === "Trailer").key}`} />}
        </Modal>
        <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        >
            <div className={styles.wrapper}>
                <div>
                    <ImageCard imgUrl={data.seasons[0].poster_path || null} title={data.name} width={isMobile ? 220 : 320} height={isMobile ? 340 : 440} />
                </div>
                <div className={styles.rightWrapper}>
                    <Title order={1} m={0} size={isMobile2 ? "h6" : "h2"}>{data.name}</Title>
                    <div className={styles.wrapper2}>
                        <Text variant="text" size={isMobile2 ? "sm" : undefined} component="p" ml={5}>{covertDataFormat(data.first_air_date)}</Text>
                        <span>&#9679;</span>
                        <Text variant="text" size={isMobile2 ? "sm" : undefined}>{data.genres.map((ele: { name: string }) => ele.name).join(",")}</Text>
                        <span>&#9679;</span>
                        {/* <Text variant="text" component="span" size={isMobile2 ? "sm" : undefined}>{runTimeConversion(data.runtime)}</Text> */}
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
                <div className={styles.paddingClass}>
                    <Title order={2} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Cast
                    </Title>
                    {/* <Cast id={id} mediaType={"MOVIE"} first={7} /> */}
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Title order={3} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Media
                    </Title>
                    {/* <MediaComponent id={id} sourceMedia={"MOVIE"} first={4} /> */}
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Title order={3} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Recommendations
                    </Title>
                    {/* <Recommendation id={id} sourceMedia={"MOVIE"} /> */}
                </div>
            </div>
            <div className={styles.bottomWrapper3}>
                <Social id={id} sourceMedia="MOVIE" homepage={data.homepage} />
                <Keywords id={id} sourceMedia={"MOVIE"} />
                <div className={styles.centerFlex}>
                    <Text fw={"bold"} variant="text">Status</Text>
                    <Text variant="text">{data.status}</Text>
                    <Text fw={"bold"} variant="text">Original Language</Text>
                    <Text variant="text">
                        {/* {convertCode(`${data.original_language}`)} */}
                    </Text>
                    <Text fw={"bold"} variant="text">Budget</Text>
                    <Text variant="text">{parseInt(data.budget).toLocaleString(acceptLang.substring(0, 5))}</Text>
                    <Text fw={"bold"} variant="text">Revenue</Text>
                    <Text variant="text">{parseInt(data.revenue).toLocaleString(acceptLang.substring(0, 5))}</Text>
                </div>
            </div>
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, req } = context;

    if (params && !params.id) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: TV_DETAILS,
        variables: {
            getTvDetailsId: params && params.id ? params.id : null
        }
    });

    if (error) {
        return {
            notFound: true
        }
    }

    // data.getTvDetails.seasons.forEach((ele: any, index: number) => {
    //     if (index === 0) {
    //         data.poster_path = ele.poster_path
    //     }
    // })

    return {
        props: {
            data: data.getTvDetails as TvDetails,
            id: params ? params.id : null,
            acceptLang: req.headers["accept-language"]
        }
    }
}
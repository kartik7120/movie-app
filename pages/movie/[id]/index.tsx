import { gql } from "apollo-server-micro";
import { GetServerSideProps } from "next";
import client from "../../../apollo-client";
import styles from "../../../styles/movie.module.css";
import React, { useState } from "react";
import ImageCard from "../../../components/ImageCard";
import { ActionIcon, Button, Divider, Text, Title, Group, Tooltip, Stack } from "@mantine/core";
import Head from "next/head";
import { runTimeConversion, covertDataFormat, getImageColor, getVideoTralier, setTextColor, formatter } from "../../../lib/util";
import { BackgroundImage, Modal, useMantineTheme } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import ReactPlayer from "react-player/youtube";
import Cast from "../../../components/Cast";
import MediaComponent from "../../../components/MediaComponent";
import Recommendation from "../../../components/Recommendation";
import Keywords from "../../../components/Keywords";
import Social from "../../../components/Social";
import { convertCode } from "../../../lib/util";
import { useMediaQuery } from "@mantine/hooks";
import ActionButtons from "../../../components/ActionButtons";
import Review from "../../../components/Review";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import ReviewComment from "../../../components/ReviewComment";
import { addDoc, collection, doc, DocumentReference, getDoc, getDocs, limit, orderBy, query, runTransaction, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { BsFillStarFill } from "react-icons/bs";

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
}
`

export default function Media({ data, id, acceptLang }: { data: any, id: number, acceptLang: string }) {
    const [color, setColor] = React.useState("");
    const [review, setReview] = React.useState<any[] | null>(null);
    const q = query(collection(db, "movies", `${id}`, "reviews"), orderBy("rating", "desc"), limit(1));
    const [contrast, setContrast] = React.useState<'black' | 'white'>('black');
    const [rating, setRating] = useState<{ averageRating: number, reviewCount: number }>({ averageRating: NaN, reviewCount: NaN });

    const [getVideo, { loading, data: videos, error }] = useLazyQuery(VIDEO_MEDIA, {
        variables: {
            getVideoMediaId: data.id,
            sourceMedia: "MOVIE"
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    React.useEffect(() => {
        const getColor = async () => {
            const col = await getImageColor(`https://image.tmdb.org/t/p/original${data.poster_path}`);
            const gradient = `linear-gradient(
                to right, rgba(${col.r}, ${col.g},${col.b}, 1) calc((50vw - 170px) - 340px),
                rgba(${col.r}, ${col.g},${col.b}, 0.84) 30%,
                rgba(${col.r}, ${col.g},${col.b}, 0.84) 100%)`;
            setColor(gradient);
            if (col) {
                const con = setTextColor(col);
                setContrast(con);
            }
        }
        getColor();
        async function getData() {
            try {
                const reviewDoc = await getDocs(q);
                const data = reviewDoc.docs.map((ele) => {
                    return {
                        id: ele.id,
                        ...ele.data()
                    }
                });
                setReview(data);
            } catch (error) {
                throw error;
            }
        }
        getData();
        async function getRating() {
            try {
                const docRef = doc(db, "movies", `${id}`);
                const movieDoc = await getDoc(docRef);
                if (movieDoc && movieDoc.data() !== undefined)
                    setRating({ averageRating: movieDoc.data()!.averageRating, reviewCount: movieDoc.data()!.numberOfReviews || NaN });
            } catch (error) {
                console.log(`error occured while fetching rating = ${error}`);
            }
        }
        getRating();
    }, [])

    const isMobile = useMediaQuery('(max-width: 694px)');
    const isMobile2 = useMediaQuery('(max-width: 490px)');
    const isMobile3 = useMediaQuery('(max-width: 650px)');
    const matches3 = useMediaQuery("(max-width:1097px)");

    const [opened, setOpened] = React.useState(false);
    const theme = useMantineTheme();
    return <>
        <Head>
            <title>{data.title}</title>
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
                <ReactPlayer playing stopOnUnmount width={isMobile3 ? 500 : matches3 ? undefined : 1000}
                    height={isMobile3 ? 300 : matches3 ? undefined : 500}
                    controls={true} url={`https://www.youtube.com/watch?v=${getVideoTralier(videos.getVideoMedia) || null}`} />
            }

        </Modal>
        <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            style={{ backgroundPosition: "left calc((50vw - 170px) - 340px) top" }}
        >
            <div className={styles.wrapper} style={{ background: color }}>
                <div>
                    <ImageCard imgUrl={data.poster_path} title={data.title} width={isMobile ? 220 : 320} height={isMobile ? 340 : 440} />
                </div>
                <div className={styles.rightWrapper}>
                    <Title color={contrast === "black" ? theme.black : theme.white} order={1} m={0} size={isMobile2 ? "h6" : "h2"}>{data.title}</Title>
                    <div className={styles.wrapper2}>
                        <Text color={contrast === "black" ? theme.black : theme.white} variant="text" size={isMobile2 ? "sm" : undefined} component="p" ml={5}>{covertDataFormat(data.release_date)}</Text>
                        <span>&#9679;</span>
                        <Text color={contrast === "black" ? theme.black : theme.white} variant="text" size={isMobile2 ? "sm" : undefined}>{data.genres.map((ele: { name: string }) => ele.name).join(",")}</Text>
                        <span>&#9679;</span>
                        <Text color={contrast === "black" ? theme.black : theme.white} variant="text" component="span" size={isMobile2 ? "sm" : undefined}>{runTimeConversion(data.runtime)}</Text>
                    </div>
                    <div className={styles.wrapper4}>
                        <Stack align="center" spacing="xs" pr={7}>
                            <Group>
                                <BsFillStarFill size={20} color="#f5c92a" />
                                <Text size="xl" color={contrast === "black" ?
                                    theme.black : theme.white}>
                                    {Number.isNaN(rating.averageRating) ? "Not Rated yet" : `${rating.averageRating}/10`}
                                </Text>
                            </Group>
                            <Text color={contrast === "black" ? theme.black : theme.white}>By {formatter(rating.reviewCount) || 0}</Text>
                        </Stack>
                        <ActionButtons id={id} mediaType="MOVIES" />
                        <Button variant="filled" onClick={() => {
                            setOpened(true);
                            getVideo();
                        }} color="blue">Play Tralier</Button>
                    </div>
                    <Text color={contrast === "black" ? theme.black : theme.white} component="p" fs="italic" weight="bold" size="lg" variant="text" >{data.tagline}</Text>
                    <Title color={contrast === "black" ? theme.black : theme.white} order={2} variant="text" >Overview</Title>
                    <Text color={contrast === "black" ? theme.black : theme.white} variant="text" component="p" size="md">{data.overview}</Text>
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
                    <Cast sourceMedia="MOVIE" id={id} mediaType={"MOVIE"} first={7} />
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Title order={3} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Media
                    </Title>
                    <MediaComponent id={id} sourceMedia={"MOVIE"} first={4} />
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Link href={`/movie/${id}/reviews`}>
                        <Group position="left" align="center">
                            <Title size="h1" order={3} fw="bold">
                                User Reviews
                            </Title>
                            <MdArrowForwardIos size={30} />
                        </Group>
                    </Link>
                    {review !== null && review !== undefined && review.length > 0 ? review?.map((ele) => {
                        return <ReviewComment mediaType="MOVIES" key={ele.id} mediaId={`${id}`} id={ele.id} rating={ele.rating} spolier={ele.spolier}
                            downvotes={ele.downvotes} upvotes={ele.upvotes} review={ele.review} title={ele.title} />
                    }) : <Text size="xl">No Reviews</Text>}
                    <Review id={id} mediaType="movies" imgUrl={data.poster_path} title={data.title} />
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Title order={3} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Recommendations
                    </Title>
                    <Recommendation id={id} sourceMedia={"MOVIE"} />
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
                        {convertCode(`${data.original_language}`)}
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

    const result = await client.query({
        query: MOVIE_DETAILS,
        variables: {
            getMovieDetailsId: params ? params.id : null
        }
    })

    return {
        props: {
            data: result.data.getMovieDetails,
            id: params ? params.id : null,
            acceptLang: req.headers["accept-language"]
        },
    }
}

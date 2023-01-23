import { gql, useLazyQuery } from "@apollo/client";
import { ActionIcon, BackgroundImage, Button, Divider, Group, Image, List, Modal, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineUnorderedList, AiTwotoneStar } from "react-icons/ai";
import { BsBookmark, BsFillStarFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import client from "../../../apollo-client";
import Cast from "../../../components/Cast";
import ImageCard from "../../../components/ImageCard";
import Keywords from "../../../components/Keywords";
import MediaComponent from "../../../components/MediaComponent";
import Recommendation from "../../../components/Recommendation";
import Social from "../../../components/Social";
import { convertCode, covertDataFormat, formatter, getImageColor, getVideoTralier, runTimeConversion, setTextColor } from "../../../lib/util";
import styles from "../../../styles/movie.module.css";
import { TvDetails } from "../../../schemaTypes";
import { SourceMedia } from "../../../schemaTypes";
import { Network } from "../../../schemaTypes";
import Link from "next/link";
import ActionButtons from "../../../components/ActionButtons";
import Review from "../../../components/Review";
import { MdArrowForwardIos } from "react-icons/md";
import ReviewComment from "../../../components/ReviewComment";
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";


const TV_DETAILS = gql`
    query TvGetTvDetails($getTvDetailsId: ID!) {
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
    status
  }
}
`

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

export default function Tv({ data, id, acceptLang, posters }: { data: any, id: number, acceptLang: string, posters: any[] }) {
    const [color, setColor] = React.useState("");
    const [opened, setOpened] = React.useState(false);
    const [contrast, setContrast] = React.useState<'black' | 'white'>('black');
    const theme = useMantineTheme();
    const [review, setReview] = React.useState<any[] | null>(null);
    const q = query(collection(db, "shows", `${id}`, "reviews"), orderBy("rating", "desc"), limit(1));
    const auth = getAuth();
    const user = auth.currentUser;
    const isMobile = useMediaQuery('(max-width: 694px)');
    const isMobile2 = useMediaQuery('(max-width: 490px)');
    const isMobile3 = useMediaQuery('(max-width: 650px)');
    const matches3 = useMediaQuery("(max-width:1097px)");
    const [rating, setRating] = useState<{ averageRating: number, reviewCount: number }>({ averageRating: NaN, reviewCount: NaN });


    const [getVideo, { loading, data: videos, error }] = useLazyQuery(VIDEO_MEDIA, {
        variables: {
            getVideoMediaId: data.id,
            sourceMedia: "TV"
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first"
    });

    React.useEffect(() => {
        const getColor = async () => {
            const col = await getImageColor(`https://image.tmdb.org/t/p/original${posters && posters[0] && posters[0].file_path ? posters[0].file_path : null}`);
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
                const docRef = doc(db, "shows", `${id}`);
                const movieDoc = await getDoc(docRef);
                if (movieDoc && movieDoc.data() !== undefined)
                    setRating({ averageRating: movieDoc.data()!.averageRating, reviewCount: movieDoc.data()!.numberOfReviews || NaN });
            } catch (error) {
                console.log(`error occured while fetching rating = ${error}`);
            }
        }
        getRating();

    }, [])

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
                <ReactPlayer playing stopOnUnmount width={isMobile3 ? 500 : matches3 ? undefined : 1000}
                    height={isMobile3 ? 300 : matches3 ? undefined : 500}
                    controls={true} url={`https://www.youtube.com/watch?v=${getVideoTralier(videos.getVideoMedia)}`} />
            }

        </Modal>
        <BackgroundImage
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            style={{ backgroundPosition: "left calc((50vw - 170px) - 340px) top" }}
        >
            <div className={styles.wrapper} style={{ background: color }}>
                <div>
                    <ImageCard imgUrl={posters && posters[0] && posters[0].file_path ? posters[0].file_path : null}
                        title={data.name} width={isMobile ? 220 : 320} height={isMobile ? 340 : 440} />
                </div>
                <div className={styles.rightWrapper}>
                    <Title color={contrast === "black" ? theme.black : theme.white} order={1} m={0}
                        size={isMobile2 ? "h6" : "h2"}>{data.name}</Title>
                    <div className={styles.wrapper2}>
                        <Text variant="text" color={contrast === "black" ? theme.black : theme.white}
                            size={isMobile2 ? "sm" : undefined} component="p" ml={5}>{covertDataFormat(data.first_air_date)}</Text>
                        <span color={contrast === "black" ? theme.black : theme.white}>&#9679;</span>
                        <Text variant="text" color={contrast === "black" ? theme.black : theme.white}
                            size={isMobile2 ? "sm" : undefined}>{data.genres.map((ele: { name: string }) => ele.name).join(",")}</Text>
                        <span color={contrast === "black" ? theme.black : theme.white} >&#9679;</span>
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
                            <Text color={contrast === "black" ? theme.black : theme.white}>By {rating.reviewCount && formatter(rating.reviewCount) || 0}</Text>
                        </Stack>
                        <ActionButtons id={id} mediaType="SHOWS" />
                        <Button variant="filled" onClick={() => {
                            setOpened(true);
                            getVideo();
                        }} color="blue">Play Tralier</Button>
                    </div>
                    <Text component="p" color={contrast === "black" ? theme.black : theme.white}
                        fs="italic" weight="bold" size="lg" variant="text" >{data.tagline}</Text>
                    <Title order={2} color={contrast === "black" ? theme.black : theme.white}
                        variant="text" >Overview</Title>
                    <Text variant="text" color={contrast === "black" ? theme.black : theme.white}
                        size="md" component="p">{data.overview}</Text>
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
                    <Cast sourceMedia="TV" id={id} mediaType={"TV"} first={7} />
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Title order={3} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Media
                    </Title>
                    <MediaComponent id={id} sourceMedia={"TV"} first={4} />
                    <Link href={`/tv/${id}/seasons`}>
                        <Button variant="gradient" mt={20}>View All Seasons</Button>
                    </Link>
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Link href={`/tv/${id}/reviews`}>
                        <Group position="left" align="center">
                            <Title size="h1" order={3} fw="bold">
                                User Reviews
                            </Title>
                            <MdArrowForwardIos size={30} />
                        </Group>
                    </Link>
                    {review !== null && review.length > 0 ? review?.map((ele) => {
                        return <ReviewComment mediaType="MOVIES" key={ele.id} mediaId={`${id}`} id={ele.id} rating={ele.rating} spolier={ele.spolier}
                            downvotes={ele.downvotes} upvotes={ele.upvotes} review={ele.review} title={ele.title} />
                    }) : <Text size="xl">No Reviews</Text>}
                    {user !== null ? <Review id={id} mediaType="shows" imgUrl={posters && posters[0] && posters[0].file_path ? posters[0].file_path : null} title={data.name} /> :
                        <Text>
                            <Link href={`#login`}>
                                <Text underline color="blue" component="span">Login</Text>
                            </Link>
                            to review
                        </Text>
                    }
                </div>
                <Divider variant="solid" size="md" m={2} />
                <div className={styles.paddingClass}>
                    <Title order={3} size={isMobile2 ? "h4" : "h2"} align="start"
                        style={{ display: "block", marginLeft: "1em", marginBottom: "1em" }}>
                        Recommendations
                    </Title>
                    <Recommendation id={id} sourceMedia={"TV"} />
                </div>
            </div>
            <div className={styles.bottomWrapper3}>
                <Social id={id} sourceMedia="TV" homepage={data.homepage} />
                <Keywords id={id} sourceMedia={"TV"} />
                <div className={styles.centerFlex}>
                    <Text fw={"bold"} variant="text">Status</Text>
                    <Text variant="text">{data.status}</Text>
                    <Text fw={"bold"} variant="text">Original Language</Text>
                    <Text variant="text">
                        {convertCode(`${data.original_language}`)}
                    </Text>
                    <Text fw={"bold"} variant="text">Type</Text>
                    <Text variant="text">{data.type}</Text>
                    <Text fw={"bold"} variant="text">Status</Text>
                    <Text variant="text">{data.status}</Text>
                    <Text fw={"bold"} variant="text">Networks</Text>
                    <List style={{ listStyleType: "none" }}>
                        {data.networks.map((ele: Network) => {
                            return <List.Item key={ele.id}>
                                <Link href={'#'}>
                                    <ActionIcon size={100}>
                                        <Image src={`https://image.tmdb.org/t/p/w500${ele.logo_path}`} alt={`${ele.name} logo`} />
                                    </ActionIcon>
                                </Link>
                            </List.Item>
                        })}
                    </List>
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
            getTvDetailsId: params && params.id ? params.id : null,
            mediaType: "TV",
        }
    });

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
            data: data.getTvDetails as TvDetails,
            id: params ? params.id : null,
            acceptLang: req.headers["accept-language"],
            posters: posters.getImageMedia.posters
        }
    }
}
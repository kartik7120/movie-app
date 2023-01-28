import { ActionIcon, Badge, Button, Card, Image as Image2, createStyles, Group, Menu, Modal, Rating, Skeleton, Stack, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { BsStar, BsFillPlayFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { MediaQuery } from "@mantine/core";
import { AiFillStar, AiOutlinePlus, AiOutlineInfoCircle, AiFillHeart } from "react-icons/ai";
import styles from "../styles/card.module.css";
import { shimmer, toBase64 } from "../lib/util";
import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import { gql, useLazyQuery } from "@apollo/client";
import { SpecificMedia } from "../schemaTypes";
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { getPlaiceholder } from "plaiceholder";

interface CardProps {
    poster_path: string,
    id: string,
    media_type: "movie" | "tv" | "people",
    original_title: string,
}

const useStyles = createStyles((theme, params, gerRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        maxWidth: "100%"
    },
    wrapper2: {
        // marginBottom: "2rem",
        overflowWrap: "break-word",
        width: "10em"
    },
    wrapper3: {
        marginTop: "2rem"
    },
    wrapper4: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1rem",
    },
    imgClass: {
        maxWidth: "100%",
        width: "auto",
        height: "auto",
        maxHeight: "100%"
    },
    wrapper5: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    }
}))

const HOME_PAGE_VIDEOS = gql`
    query GetVideoMedia($getVideoMediaId: ID!, $sourceMedia: SourceMedia!, $includeType: String) {
  getVideoMedia(id: $getVideoMediaId, sourceMedia: $sourceMedia, include_type: $includeType) {
    ... on SpecificMedia {
      mediaMap {
        key
        value {
          key
          name
          site
          type
        }
      }
    }
  }
}
`

export default function CardComponent(props: CardProps): JSX.Element {

    const { classes } = useStyles();
    const [value, setValue] = useState(0);
    const [watchList, setWatchList] = useState(false);
    const [favList, setFavList] = useState(false);
    const [review, setReview] = React.useState<any | null>(null);
    const [placeholder, setPlaceholder] = useState("");
    const auth = getAuth();
    const user = auth.currentUser;
    const [opened, setOpened] = useState(false);
    const [rating, setRating] = useState<{ averageRating: number }>({ averageRating: NaN });

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "users", user.uid, "watchlist"), where("id", "==", `${props.id}`))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        setWatchList(true);
                    }
                    if (change.type === "removed") {
                        setWatchList(false);
                    }
                })
            })

            const q2 = query(collection(db, "users", user.uid, "favlist"), where("id", "==", `${props.id}`))
            const unsubscribe2 = onSnapshot(q2, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log(change.doc.data());
                    if (change.type === "added") {
                        setFavList(true);
                    }
                    if (change.type === "removed") {
                        setFavList(false);
                    }
                })
            })


            async function getRating() {
                try {
                    const docRef = doc(db, props.media_type === "movie" ? "movies" : "shows", `${props.id}`);
                    const movieDoc = await getDoc(docRef);
                    if (movieDoc && movieDoc.data() !== undefined)
                        setRating({ averageRating: movieDoc.data()!.averageRating });
                    if (props.id === "315162")
                        console.log(movieDoc.data());
                } catch (error) {
                    console.log(`error occured while fetching rating = ${error}`);
                }
            }
            getRating();
            return () => {
                unsubscribe();
                unsubscribe2();
            }
        }

    }, [props.id, user])

    async function handleClick() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "watchlist", `${props.id}`);
            await setDoc(docRef, {
                id: props.id,
                mediaType: props.media_type === "movie" ? "movie" : "tv"
            }, { merge: true }).then((value) => {
                console.log(`added to watch list`)
            }).catch((err) => {
                console.log(`error occured while adding data to database`)
            })
        }
    }

    async function handleFavouriteButton() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "favlist", `${props.id}`);
            await setDoc(docRef, {
                id: props.id,
                mediaType: props.media_type === "movie" ? "movie" : "tv"
            }, { merge: true }).then((value) => {
                console.log(`added to favourite list`)
            }).catch((err) => {
                console.log(`error occured while adding data to database`)
            })
        }
    }

    async function removeWatchList() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "watchlist", `${props.id}`);
            await deleteDoc(docRef).then((value) => {
                console.log(`doc deleted from watchlist`);
                setWatchList(false);
            }).catch((err) => {
                console.log(`error occured while deleting watchlist`);
            })
        }
    }

    async function removeFavList() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "favlist", `${props.id}`);
            await deleteDoc(docRef).then((value) => {
                console.log(`doc deleted from watchlist`);
                setFavList(false);
            }).catch((err) => {
                console.log(`error occured while deleting watchlist`);
            })
        }
    }

    return <>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={<Text align="center" size="xl" color="yellow">RATE THIS!</Text>}
            centered
        >
            <Stack align="center">
                <Text align="center" size="lg" pt={10} pb={10}>{props.original_title}</Text>
                {props.media_type !== "people" ? <Rating value={(review && review.rating) || value} onChange={setValue} size="xl" count={10} /> : ""}
            </Stack>
        </Modal>

        <Card shadow="md" p="lg" radius="sm" withBorder className={styles.card}>
            <Card.Section>
                <Link href={`/${props.media_type}/${props.id}`}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w300${props.poster_path}`}
                        alt={`${props.original_title} poster`}
                        priority={true}
                        width={200}
                        height={270}
                        className={classes.imgClass}
                        placeholder="blur"
                        blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8dmz9fgAHkQL8eDWg2QAAAABJRU5ErkJggg==`}
                    />
                    {/* <Image2 withPlaceholder className={classes.imgClass}
                        height={300} src={`https://image.tmdb.org/t/p/w300${props.poster_path}`}
                        alt={`${props.original_title} poster`} /> */}
                </Link>
            </Card.Section>
            <div className={classes.wrapper5}>
                <div className={classes.wrapper2}>
                    <div className={classes.wrapper}>
                        <AiFillStar color="#c39400" size={20} style={{ alignSelf: "center" }} />
                        {props.media_type !== "people" && <Text variant="text" pl={3}>{rating.averageRating || "N\\A"}</Text>}
                    </div>
                    <Link style={{ margin: 0 }} href={`/${props.media_type}/${props.id}`}>
                        <Text span sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} size="md" align="left">
                            {props.original_title}
                        </Text>
                    </Link>
                </div>
                {props.media_type !== "people" && <div className={classes.wrapper4}>
                    <MediaQuery styles={{ display: "none" }} query="(min-width:690px)">
                        <ActionIcon radius="md" variant="subtle" size="md">
                            <AiOutlineInfoCircle color="white" size={25} />
                        </ActionIcon>
                    </MediaQuery>
                    <MediaQuery styles={{ display: "none" }} query="(max-width:690px)">
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <ActionIcon radius="md" variant="subtle" size="xl">
                                    <AiOutlineInfoCircle color="white" size={25} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>Options</Menu.Label>
                                <Menu.Item onClick={!watchList ? handleClick : removeWatchList} icon={<BsFillBookmarkPlusFill size={14} />}>
                                    {!watchList ? 'Add to' : "Remove from"} Watchlist
                                </Menu.Item>
                                <Menu.Item onClick={!favList ? handleFavouriteButton : removeFavList} icon={<AiFillHeart size={14} />}>
                                    {!favList ? 'Add to' : "Remove from"} Favourite
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </MediaQuery>
                </div>}
            </div>
        </Card>
    </>
}
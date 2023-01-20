import { ActionIcon, Badge, Button, Card, createStyles, Group, Menu, Skeleton, Text, useMantineTheme } from "@mantine/core";
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
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

interface CardProps {
    poster_path: string,
    id: string,
    media_type: "movie" | "tv",
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
        marginBottom: "2rem",
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
    const [url, setUrl] = React.useState<{ key: string, value: string }>({ key: "", value: "" });
    const theme = useMantineTheme();
    const [watchList, setWatchList] = useState(false);
    const [favList, setFavList] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;


    const [getVideo, { loading, error, data }] = useLazyQuery<SpecificMedia>(HOME_PAGE_VIDEOS, {
        variables: {
            getVideoMediaId: props.id,
            sourceMedia: props.media_type,
            includeType: "Trailer"
        }
    })

    const [getVideo2, { loading: loading2, error: error2, data: data2 }] = useLazyQuery(HOME_PAGE_VIDEOS, {
        variables: {
            getVideoMediaId: props.id,
            sourceMedia: props.media_type,
            includeType: "Teaser"
        }
    })

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

    return <Card shadow="md" p="lg" radius="sm" withBorder className={styles.card}>
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
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200, 270))}`}
                />
            </Link>
        </Card.Section>
        <div className={classes.wrapper2}>
            <Group position="apart" mt={3} sx={{ maxWidth: "100%" }}>
                <div className={classes.wrapper}>
                    <AiFillStar color="yellow" size={20} style={{ alignSelf: "center" }} />
                    <Text variant="text" pl={3}>6.5</Text>
                </div>
                <ActionIcon radius="sm" variant="subtle" size="lg"><BsStar color="cyan" size={18} /></ActionIcon>
            </Group>
            <Link href={`/${props.media_type}/${props.id}`}>
                <Text lineClamp={3} size="md" align="left" component="p" m={1} style={{ height: "2rem" }}>
                    {props.original_title}
                </Text>
            </Link>
        </div>
        <div className={classes.wrapper3}>
            <div className={classes.wrapper4}>
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
            </div>
        </div>
    </Card>
}
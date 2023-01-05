import { ActionIcon, Badge, Button, Card, createStyles, Group, Skeleton, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { BsStar, BsFillPlayFill } from "react-icons/bs";
import { MediaQuery } from "@mantine/core";
import { AiFillStar, AiOutlinePlus, AiOutlineInfoCircle } from "react-icons/ai";
import styles from "../styles/card.module.css";
import { shimmer, toBase64 } from "../lib/util";
import React from "react";
import Link from "next/dist/client/link";

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

export default function CardComponent(props: CardProps): JSX.Element {

    const { classes } = useStyles();
    const theme = useMantineTheme();

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
                <Text size="md" align="left" component="p" m={1} style={{ height: "2rem" }}>
                    {props.original_title}
                </Text>
            </Link>
        </div>
        <div className={classes.wrapper3}>
            <MediaQuery styles={{ display: "none" }} query="(min-width:690px)">
                <Button type="button" variant="outline" size="sm" leftIcon={<AiOutlinePlus />}>Watchlist</Button>
            </MediaQuery>
            <MediaQuery styles={{ display: "none" }} query="(max-width:690px)">
                <Button type="button" variant="outline" size="md" leftIcon={<AiOutlinePlus />}>Watchlist</Button>
            </MediaQuery>
            <div className={classes.wrapper4}>
                <MediaQuery styles={{ display: "none" }} query="(min-width:690px)">
                    <Button type="button" variant="outline" size="xs" color="teal"
                        leftIcon={<BsFillPlayFill size={20} />}>Trailer</Button>
                </MediaQuery>
                <MediaQuery styles={{ display: "none" }} query="(max-width:690px)">
                    <Button type="button" variant="outline" size="sm" color="teal"
                        leftIcon={<BsFillPlayFill size={20} />}>Trailer</Button>
                </MediaQuery>
                <MediaQuery styles={{ display: "none" }} query="(min-width:690px)">
                    <ActionIcon radius="md" variant="subtle" size="md">
                        <AiOutlineInfoCircle color="white" size={25} />
                    </ActionIcon>
                </MediaQuery>
                <MediaQuery styles={{ display: "none" }} query="(max-width:690px)">
                    <ActionIcon radius="md" variant="subtle" size="xl">
                        <AiOutlineInfoCircle color="white" size={25} />
                    </ActionIcon>
                </MediaQuery>
            </div>
        </div>
    </Card>
}
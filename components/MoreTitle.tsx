import { Title, Button } from "@mantine/core";
import { BsArrowLeft } from "react-icons/bs";
import styles from "../styles/poster.module.css";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    title: string,
    id: number | null,
    sourceMedia: "MOVIE" | "TV",
    backpath?: string
}

export default function MoreTitle(props: Props): JSX.Element {
    const router = useRouter();

    React.useEffect(() => {
        router.prefetch(`/${props.sourceMedia}/${props.id}`);
    }, [props.id, router, props.sourceMedia]);

    return <div className={styles.titleWrapper}>
        <div>
            <Title order={2} size='h2'>{props.title}</Title>
            <Button type="button" onClick={() => router.push(props.backpath || `/${props.sourceMedia.toLowerCase()}/${props.id}`)} variant="outline" size="sm" color="cyan" leftIcon={<BsArrowLeft />}>
                Back to main
            </Button>
        </div>
    </div>
}
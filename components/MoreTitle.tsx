import { Title, Button } from "@mantine/core";
import { BsArrowLeft } from "react-icons/bs";
import styles from "../styles/poster.module.css";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    title: string,
    id: number | null
}

export default function MoreTitle(props: Props): JSX.Element {
    const router = useRouter();

    React.useEffect(() => {
        router.prefetch(`/movie/${props.id}`);
    }, [props.id, router]);

    return <div className={styles.titleWrapper}>
        <div>
            <Title order={2} size='h2'>{props.title}</Title>
            <Button type="button" onClick={() => router.push(`/movie/${props.id}`)} variant="outline" size="sm" color="cyan" leftIcon={<BsArrowLeft />}>
                Back to main
            </Button>
        </div>
    </div>
}
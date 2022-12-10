import { Text, Card, Button } from "@mantine/core"
import Link from "next/link";
import styles from "../styles/LeftOptions.module.css";

interface Props {
    title: string,
    list: { key: string, value: string | null }[],
    id: number | null
}

export default function LeftOptions(props: Props): JSX.Element {
    return <Card withBorder className={styles.card} radius="md" p="lg" style={{ display: "inline-block" }}>
        <Card.Section bg="red">
            <Text variant="text" p="1em" size="xl">{props.title}</Text>
        </Card.Section>
        <ul className={styles.wrapper}>
            <li className={styles.list}>
                <Link href={`/movie/${props.id}/images/posters?include_language=${'en'}`}><Text size="lg">{`Default`}</Text></Link>
            </li>
            {props.list.map((ele, index: number) => {
                return <li className={styles.list} key={Math.random() * index * 5}>
                    <Link href={`/movie/${props.id}/images/posters?include_language=${ele.value}`}><Text size="lg">{ele.key}</Text></Link>
                </li>
            })}
        </ul>
    </Card>
}
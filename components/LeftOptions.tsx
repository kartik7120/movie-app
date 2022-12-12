import { Text, Card, Button } from "@mantine/core"
import Link from "next/link";
import styles from "../styles/LeftOptions.module.css";

interface Props {
    title: string,
    list: { key: string, value: string | null }[],
    id: number | null,
    type: "posters" | "backdrops"
}

export default function LeftOptions(props: Props): JSX.Element {
    return <div className={styles.wrapper2}>
        <Text variant="text" p="1em" size="xl" style={{ backgroundColor: "red", borderRadius: "10px" }}>{props.title}</Text>
        <ul className={styles.wrapper}>
            <li className={styles.list}>
                <Link href={`/movie/${props.id}/images/${props.type}?include_language=${'en'}`}><Text size="lg">{`Default`}</Text></Link>
            </li>
            {props.list.map((ele, index: number) => {
                return <li className={styles.list} key={Math.random() * index * 5}>
                    <Link href={`/movie/${props.id}/images/${props.type}?include_language=${ele.value}`}><Text size="lg">{ele.key}</Text></Link>
                </li>
            })}
        </ul>
    </div>
}
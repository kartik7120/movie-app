import { Text, Card, Button } from "@mantine/core"
import Link from "next/link";
import styles from "../styles/LeftOptions.module.css";

interface Props {
    title: string,
    list: any[]
}

export default function LeftOptions(props: Props): JSX.Element {
    return <Card withBorder radius="md" p="lg">
        <Card.Section bg="red">
            <Text variant="text" p="1em" size="xl">{props.title}</Text>
        </Card.Section>
        <ul className={styles.wrapper}>
            {Array.from(new Set(props.list.map((ele) => { return ele.iso_639_1 }))).map((lang: string, index: number) => {
                return <li className={styles.list} key={Math.random() * index * 5}>
                    <Link href={`#`}><Text size="lg">{lang}</Text></Link>
                </li>
            })}
        </ul>
    </Card>
}
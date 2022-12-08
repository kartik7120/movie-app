import { Text } from "@mantine/core"
import { convertCode } from "../lib/util";

interface Props {
    title: string,
    list: any[]
}

export default function LeftOptions(props: Props): JSX.Element {
    return <div>
        <Text variant="text" size="lg">{props.title}</Text>
        <ul>
            {Array.from(new Set(props.list.map((ele, index: number) => { return ele.iso_639_1 }))).map((lang: string, index: number) => {
                return <li key={Math.random() * index * 5}>{lang}</li>
            })}
        </ul>
    </div>
}
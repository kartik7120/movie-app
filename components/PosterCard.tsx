import { Card, Image, Text, Title } from "@mantine/core";
import { convertCode } from "../lib/util";
import { useRouter } from "next/router"
import Link from "next/link";

interface Props {
    imgURL: string,
    size: string,
    language: string | null,
    width?: number | null,
    height?: number | null
}

export default function PosterCard(props: Props): JSX.Element {

    return <Card shadow="md" p="lg" radius="md" withBorder mb={"md"} ml={"xs"} style={{ height: "min-content" }}>
        <Card.Section withBorder>
            <Link href={`https://image.tmdb.org/t/p/original${props.imgURL}`} target="_blank">
                <Image src={`https://image.tmdb.org/t/p/w200${props.imgURL}`} withPlaceholder
                    width={props.width || 200} height={props.height || 300} alt="" title="View Original" style={{ cursor: "pointer" }} />
            </Link>
        </Card.Section>
        <Text variant="text" fw="bold">
            Size
            <Text>
                {props.size}
            </Text>
        </Text>
        <Text>
            Language
            <Text>
                {convertCode(props.language)}
            </Text>
        </Text>
    </Card >
}
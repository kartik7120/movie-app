import { Card, Image, Text, Title } from "@mantine/core";
import { convertCode } from "../lib/util";
import { useRouter } from "next/router"
import Link from "next/link";

interface Props {
    imgURL: string,
    size: string,
    language: string | null
}

export default function PosterCard(props: Props): JSX.Element {

    return <Card shadow="md" p="lg" radius="md" withBorder mb={"md"}>
        <Card.Section withBorder>
            <Link href={`https://image.tmdb.org/t/p/original${props.imgURL}`} target="_blank">
                <Image src={`https://image.tmdb.org/t/p/w200${props.imgURL}?api_key=${process.env.API_KEY}`} withPlaceholder
                    width={200} height={300} alt="" title="View Original" style={{ cursor: "pointer" }} />
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
                {props.language}
            </Text>
        </Text>
    </Card >
}
import { Card, Image } from "@mantine/core";
import { Maybe } from "../schemaTypes";

interface Props {
    imgUrl: string | null | Maybe<string> | undefined,
    title?: string | string[] | null,
    w?: "w200" | "w300" | "w400",
    width: number,
    height: number
}

export default function ImageCard(props: Props): JSX.Element {
    return (
        <Card shadow="sm" p="lg" withBorder radius="md" w="min-content">
            <Card.Section>
                <Image src={props.imgUrl !== null ? `https://image.tmdb.org/t/p/${props.w ? props.w : "w300"}${props.imgUrl}` : null} alt={`${props.title || "Media Image"}`}
                    withPlaceholder width={props.width} height={props.height} />
            </Card.Section>
        </Card>
    )
}
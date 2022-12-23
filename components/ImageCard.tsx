import { Card, Image } from "@mantine/core";

interface Props {
    imgUrl: string | null,
    title?: string | string[] | null,
    width: number,
    height: number
}

export default function ImageCard(props: Props): JSX.Element {
    return (
        <Card shadow="sm" p="lg" withBorder radius="md">
            <Card.Section>
                <Image src={props.imgUrl !== null ? `https://image.tmdb.org/t/p/w300${props.imgUrl}` : null} alt={`${props.title || "Media Image"}`}
                    withPlaceholder width={props.width} height={props.height} />
            </Card.Section>
        </Card>
    )
}
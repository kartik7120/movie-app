import { Card, Image } from "@mantine/core";

interface Props {
    imgUrl: string,
    title?: string
}

export default function ImageCard(props: Props): JSX.Element {
    return (
        <Card shadow="sm" p="lg" withBorder radius="md">
            <Card.Section>
                <Image src={`https://image.tmdb.org/t/p/w300${props.imgUrl}`} alt={`${props.title || "Media Image"}`}
                    withPlaceholder width={250} height={350} />
            </Card.Section>
        </Card>
    )
}
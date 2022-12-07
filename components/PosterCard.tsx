import { Card, Image, Text, Title } from "@mantine/core";

interface Props {
    imgURL: string,
    size: string,
    language: string | null
}

export default function PosterCard(props: Props): JSX.Element {
    return <Card shadow="md" p="lg" radius="md" withBorder>
        <Card.Section withBorder>
            <Image src={`https://image.tmdb.org/t/p/w200${props.imgURL}?api_key=${process.env.API_KEY}`} withPlaceholder
                width={200} height={300} alt="" />
        </Card.Section>
        <Title order={3} size="h2">
            Size
        </Title>
        <Text variant="text" fw="bold">
            Added by
            <Text>
                {props.size}
            </Text>
        </Text>
        <Text>
            Language
            <Text>
                {props.language !== null ? props.language : "No Language"}
            </Text>
        </Text>
    </Card>
}
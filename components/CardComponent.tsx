import { Badge, Button, Card, Group, Text } from "@mantine/core";
import Image from "next/image";

interface CardProps {
    poster_path: String
}

export default function CardComponent(props: CardProps) {

    const url: string = `https://image.tmdb.org/t/p/w200${props.poster_path}`;

    return <Card shadow="md" p="lg" radius="md" withBorder sx={{ width: 200 ,height:"100%"}}>
        <Card.Section>
            <Image
                src={url}
                alt="Norway"
                priority={true}
                fill
            />

        </Card.Section>
        {/* <Text size="sm" color="dimmed">
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        </Text>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Book classic tour now
        </Button> */}
    </Card>
}
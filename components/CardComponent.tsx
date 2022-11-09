import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";

export default function CardComponent() {

    return <Card shadow="md" p="lg" radius="md" withBorder sx={{ width: 250 }}>
        <Card.Section>
            <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                // height={160}
                alt="Norway"
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
import { ActionIcon, Badge, Button, Card, createStyles, Group, Text } from "@mantine/core";
import Image from "next/image";
import { BsStar } from "react-icons/bs";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";

interface CardProps {
    poster_path: string,
    original_title: string
}

const useStyles = createStyles((theme, params, gerRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left"
    },
    wrapper2: {
        marginBottom: "2rem"
    }
}))

export default function CardComponent(props: CardProps): JSX.Element {

    const { classes } = useStyles();

    return <Card shadow="md" p="lg" radius="md" withBorder sx={{ width: 170, height: "100%" }}>
        <Card.Section>
            <Image
                src={`https://image.tmdb.org/t/p/w200${props.poster_path}`}
                alt="Norway"
                priority={true}
                width={170}
                height={200}
            />
        </Card.Section>
        <div className={classes.wrapper2}>
            <Group position="apart" mt={3}>
                <div className={classes.wrapper}>
                    <AiFillStar color="yellow" size={20} style={{ alignSelf: "center" }} />
                    <Text variant="text" pl={3}>6.5</Text>
                </div>
                <ActionIcon radius="sm" variant="subtle" size="lg"><BsStar color="cyan" size={18} /></ActionIcon>
            </Group>
            <Text size="md" align="left" component="p">
                {props.original_title}
            </Text>
        </div>
        <Button type="button" variant="outline" leftIcon={<AiOutlinePlus />}> Watchlist</Button>
    </Card>
}
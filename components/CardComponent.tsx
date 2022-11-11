import { ActionIcon, Badge, Button, Card, createStyles, Group, Text, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { BsStar, BsFillPlayFill } from "react-icons/bs";
import { AiFillStar, AiOutlinePlus, AiOutlineInfoCircle } from "react-icons/ai";

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
        marginBottom: "2rem",
    },
    wrapper3: {
        marginTop: "2rem"
    },
    wrapper4: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "1rem"
    }
}))

export default function CardComponent(props: CardProps): JSX.Element {

    const { classes } = useStyles();
    const theme = useMantineTheme();

    return <Card shadow="md" p="lg" radius="sm" withBorder sx={{ width: "75%", height: "100%" }}>
        <Card.Section>
            <Image
                src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
                alt={`${props.original_title} poster`}
                priority={true}
                width={200}
                height={270}
            />
        </Card.Section>
        <div className={classes.wrapper2}>
            <Group position="apart" mt={3}>
                <div className={classes.wrapper}>
                    <AiFillStar color="yellow" size={20} style={{ alignSelf: "center" }} />
                    <Text variant="text" pl={3}>6.5</Text>
                </div>
                <ActionIcon radius="sm" variant="subtle" size="lg"><BsStar color="cyan" size={18} /></ActionIcon>
                <Text size="md" align="left" component="p" m={0} style={{ height: "2rem" }}>
                    {props.original_title || "NaN"}
                </Text>
            </Group>
        </div>
        <div className={classes.wrapper3}>
            <Button type="button" variant="outline" size="md" leftIcon={<AiOutlinePlus />}> Watchlist</Button>
            <div className={classes.wrapper4}>
                <Button type="button" variant="outline" size="sm" color="teal" leftIcon={<BsFillPlayFill size={20}/>}>Trailer</Button>
                <ActionIcon radius="md" variant="subtle" size="xl"><AiOutlineInfoCircle color="white" size={25} /></ActionIcon>
            </div>
        </div>
    </Card>
}
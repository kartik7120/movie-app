import { ActionIcon, Badge, Group, Spoiler, Text } from "@mantine/core";
import { BiDislike, BiLike } from "react-icons/bi";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, params, getRef) => ({
    wrapper: {
        marginTop: "10px"
    }
}));

interface Props {
    title: string,
    review: string,
    upvotes?: number,
    downvotes?: number,
    spolier: boolean
}

export default function ReviewComment(props: Props) {

    const styles = useStyles();

    return <div className={styles.classes.wrapper}>
        <Text size="xl" fw="bold">{props.title}</Text>
        {props.spolier ? <Badge variant="filled" color="red">Spolier</Badge> : ""}
        <Spoiler maxHeight={props.spolier ? 0 : 120} showLabel="Show more" hideLabel="Hide">
            <Text size="md">
                {props.review}
            </Text>
        </Spoiler>
        <Group spacing="xl">
            <ActionIcon size="xl">
                <BiLike />
            </ActionIcon>
            <ActionIcon size="xl">
                <BiDislike />
            </ActionIcon>
        </Group>
    </div>
}
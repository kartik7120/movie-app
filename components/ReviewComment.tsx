import { ActionIcon, Badge, Group, Spoiler, Text } from "@mantine/core";
import { BiDislike, BiLike } from "react-icons/bi";
import { createStyles } from "@mantine/core";
import { AiFillStar } from "react-icons/ai";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
    spolier: boolean,
    rating: number,
    id: string,
    mediaId: string
}

export default function ReviewComment(props: Props) {

    const styles = useStyles();

    async function handleClick() {
        console.log('handle click ran')
        try {
            await updateDoc(doc(db, "movies", props.mediaId, "reviews", props.id), {
                upvotes: increment(1)
            }).then((value) => {
                console.log(`value updated`);
            }).catch((err) => {
                console.log(`error occured while incrementing votes = ${err}`);
            })
        } catch (error) {
            console.log(`error occured while fetching data = ${error}`);
        }
    }

    return <div className={styles.classes.wrapper}>
        <Group position="left">
            <AiFillStar color="#c39400" size={20} /> {props.rating} / 10
        </Group>
        <Text size="xl" fw="bold">{props.title}</Text>
        {props.spolier ? <Badge variant="filled" color="red">Spolier</Badge> : ""}
        <Spoiler maxHeight={props.spolier ? 0 : 120} showLabel="Show more" hideLabel="Hide">
            <Text size="md">
                {props.review}
            </Text>
        </Spoiler>
        <Group spacing="xl">
            <ActionIcon size="xl" onClick={handleClick} >
                <Group position="left">
                    <BiLike /><Text >{props.upvotes}</Text>
                </Group>
            </ActionIcon>
            <Group position="apart">
                <ActionIcon size="xl">
                    <BiDislike />
                </ActionIcon>
                <Text>{props.downvotes}</Text>
            </Group>
        </Group>
    </div>
}
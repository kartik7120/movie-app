import React, { useState } from "react";
import { Button, Checkbox, Drawer, Rating, Text, Textarea, TextInput, Title } from "@mantine/core";
import ImageCard from "./ImageCard";
import styles from "../styles/review.module.css";

interface Props {
    title: string,
    imgUrl: string
}

export default function Review(props: Props) {
    const [opened, setOpened] = React.useState(false);

    return <>
        <Drawer opened={opened} position="right"
            transition="rotate-left"
            transitionDuration={250}
            transitionTimingFunction="ease"
            onClose={() => setOpened(false)} title={<Title order={2} size="h1">Review</Title>} padding="xl" size="xl">
            <div className={styles.wrapper}>
                <ImageCard height={160} width={100} w="w200" imgUrl={props.imgUrl} />
                <Title order={3} pl={15} size="h2">{props.title}</Title>
            </div>
            <Text size="lg">Your rating</Text>
            <Rating count={10} defaultValue={1} m={10} ml={0} />
            <Text size="lg">Your Review</Text>
            <TextInput placeholder="Write a headline for your review here" mt={5} withAsterisk required label="Title" />
            <Textarea maxRows={4} placeholder="Write your review here" label="Review" mt={20}
                autosize minRows={4} withAsterisk required maxLength={600} />
            <Checkbox
                label="Does this review contain spolier"
                size="md"
                mt={20}
            />
            <Button type="submit" mt={20} fullWidth>Submit</Button>
        </Drawer>
        <Button onClick={() => setOpened(true)}>Add Review</Button>
    </>
}
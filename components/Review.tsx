import React, { useState } from "react";
import { Button, Checkbox, Drawer, Rating, Text, Textarea, TextInput, Title } from "@mantine/core";

export default function Review() {
    const [opened, setOpened] = React.useState(false);

    return <>
        <Drawer opened={opened} position="right"
            transition="rotate-left"
            transitionDuration={250}
            transitionTimingFunction="ease"
            onClose={() => setOpened(false)} title="Review" padding="xl" size="xl">
            <Rating count={10} defaultValue={1} />
            <Text size="lg">Your Review</Text>
            <TextInput placeholder="Write a headline for your review here" withAsterisk required label="Title" />
            <Textarea placeholder="Write your review here" label="Review"
                autosize minRows={4} withAsterisk required maxLength={600} />
            <Checkbox
                label="Does this review contain spolier"
                size="md"
            />
            <Button type="submit">Submit</Button>
        </Drawer>
        <Button onClick={() => setOpened(true)}>Add Review</Button>
    </>
}
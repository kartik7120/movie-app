import React, { useEffect, useState } from "react";
import { Alert, Button, Checkbox, Drawer, Group, Rating, ScrollArea, Text, Textarea, TextInput, Title } from "@mantine/core";
import ImageCard from "./ImageCard";
import styles from "../styles/review.module.css";
import { useForm, Controller, useWatch, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { IoMdWarning } from "react-icons/io";
import { db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

interface Props {
    title: string,
    imgUrl: string,
    id: number,
    mediaType: "movies" | "shows"
}

interface Form {
    rating: number,
    title: string,
    review: string,
    spolier: boolean,
    error: string
}

export default function Review(props: Props) {
    const [opened, setOpened] = React.useState(false);
    const [renderForm, setRenderForm] = React.useState(true);

    const { register, setError, control, formState: { errors, isSubmitting, isSubmitSuccessful },
        handleSubmit, reset } = useForm<Form>({
            defaultValues: {
                rating: 0,
                review: "",
                title: "",
                spolier: false
            },
            shouldUnregister: true
        })

    useEffect(() => {
        if (isSubmitSuccessful)
            reset();
    }, [isSubmitSuccessful, reset])


    const watch = useWatch<Form>({
        control,
    });

    const onSubmit: SubmitHandler<Form> = async (data) => {
        await addDoc(collection(db, props.mediaType, `${props.id}`, "reviews"), data).then((value) => {
            console.log(`review written to the database`);
            setRenderForm(false);
        }).catch((error) => {
            setError("error", { message: error, type: "custom" });
            console.log(`error occured while sending writing data to database = ${error}`);
        })
    };
    const onSubmitError: SubmitErrorHandler<Form> = (error) => console.log(error);

    return <>
        <Drawer closeOnClickOutside={false} opened={opened} position="right"
            transition="rotate-left"
            transitionDuration={250}
            transitionTimingFunction="ease"
            onClose={() => setOpened(false)} title={<Title order={2} size="h1">Review</Title>} padding="xl" size="xl">
            <ScrollArea.Autosize maxHeight={"90%"} style={{ height: "90%" }} mx="auto">
                <div className={styles.wrapper}>
                    <ImageCard height={160} width={100} w="w200" imgUrl={props.imgUrl} />
                    <Title order={3} pl={15} size="h2">{props.title}</Title>
                </div>
                {renderForm === false ? <Alert mt={15} title="Success" color="teal" withCloseButton onClose={() => setRenderForm(true)}>
                    Thank you for contributing!
                </Alert>
                    : <form action="" onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                        <Text size="lg">Your rating</Text>
                        <Controller name="rating" control={control} rules={{ max: 10, min: 1, required: "Please rate this" }} render={
                            ({ field: { name, onChange, onBlur, ref, value }, formState: { errors } }) => (
                                <Group spacing="md">
                                    <Rating count={10} defaultValue={0} m={10} ml={0}
                                        ref={ref} onChange={onChange} onBlur={onBlur} />
                                    <Text>{watch["rating"]}</Text>
                                </Group>
                            )
                        }
                        />
                        <Text size="lg">Your Review</Text>
                        <Controller name="title" control={control} rules={{ maxLength: 175, required: "Please give a title to this review" }}
                            render={
                                ({ field: { name, onChange, onBlur, ref, value }, formState: { errors } }) => (
                                    <TextInput name={name} onChange={onChange} onBlur={onBlur}
                                        value={value} ref={ref} maxLength={175}
                                        placeholder="Write a headline for your review here" mt={5}
                                        withAsterisk required label="Title" error={errors && errors["title"] ? errors["title"].message : ""} />
                                )
                            } />
                        <Controller name="review" control={control} rules={{ maxLength: 600, required: "Please add a review" }}
                            render={
                                ({ field: { name, onChange, onBlur, ref, value }, formState: { errors } }) => (
                                    <Textarea name={name} onChange={onChange} onBlur={onBlur}
                                        error={errors && errors["review"] ? errors["review"].message : ""}
                                        value={value} ref={ref} maxRows={4} placeholder="Write your review here" label="Review" mt={20}
                                        autosize minRows={4} withAsterisk required maxLength={600} />
                                )} />
                        <Controller name="spolier" control={control}
                            render={
                                ({ field: { name, onChange, onBlur, ref, value }, formState: { errors } }) => (
                                    <Checkbox
                                        name={name} onChange={onChange} onBlur={onBlur}
                                        checked={value} ref={ref}
                                        label="Does this review contain spolier"
                                        size="md"
                                        mt={20}
                                        error={errors && errors["spolier"] ? errors["spolier"].message : ""}
                                    />
                                )
                            }
                        />
                        <Button loading={isSubmitting} type="submit" mt={20} fullWidth>Submit</Button>
                    </form>}
                {errors && errors["error"] ? <Alert mt={15} icon={<IoMdWarning size={16} />} title="Bummer!" color="red">
                    {errors["error"].message}
                </Alert> : ""}
            </ScrollArea.Autosize>
        </Drawer>
        <Button onClick={() => setOpened(true)}>Add Review</Button>
    </>
}
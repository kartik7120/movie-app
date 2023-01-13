import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Divider,
    Alert,
} from '@mantine/core';

import Link from "next/link";
import { useForm, Controller, useWatch } from "react-hook-form";
import { SubmitHandler, SubmitErrorHandler } from 'react-hook-form/dist/types';
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import GoogleButton from '../components/SocialButton';
import Head from 'next/head';
import { FiAlertTriangle } from 'react-icons/fi';
import React from 'react';

interface Sign {
    email: string,
    error: ""
}

export default function ForgotPassword() {

    const { formState: { errors }, handleSubmit, setError, control } = useForm<Sign>({
        defaultValues: {
            email: "",
        },
    })

    const [emailSend, setEmailSend] = React.useState(false);

    const watch = useWatch<Sign>({
        control,
    })

    const onSubmit: SubmitHandler<Sign> = async (data) => {
        try {
            await sendPasswordResetEmail(auth, data["email"])
                .then(() => {
                    setEmailSend(true);
                })
        } catch (error: any) {
            // if (error.code === "auth/wrong-password")
            //     setError("password", { type: "wrongPass", message: `${error.message}` });
            // else
            setError("error", { type: "custom", message: `${error.message}` });
            // resetField("password");
            console.log(`error occured while signin = ${error.message} and code = ${error.code}`);
        }
    };
    const onError: SubmitErrorHandler<Sign> = (error) => console.log(error);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Reset Password</title>
            </Head>
            <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
                {emailSend ? <Container size={420} my={40}>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Title
                            align="center"
                            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                        >
                            Check your email
                        </Title>
                        <Text color="dimmed" size="sm" align="center" mt={5}>
                            You will receive an email from us with instructions for resetting your password.
                            If you don&apos;t receive this email, please check your junk mail folder or visit our Help pages to contact Customer Service for further assistance.
                        </Text>

                        {errors && errors["error"] ? < Alert icon={<FiAlertTriangle size={16} />} title="Error" mt="xl" color="red">
                            {errors["error"].message}
                        </Alert> : ""}
                    </Paper>
                </Container> : <Container size={420} my={40}>
                    <Title
                        align="center"
                        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                    >
                        Reset Password
                    </Title>
                    <Text color="dimmed" size="sm" align="center" mt={5}>
                        Enter the email address associated with your IMDb account, then click Continue.
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <Controller control={control} name="email" rules={{ required: true }} render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                            formState: { errors },
                        }) => (
                            <TextInput error={`${error ? errors["email"]?.type === "exists" ? "Please Log-in this email is already in use" : errors["email"]?.message : ""}`} onBlur={onBlur}
                                onChange={onChange} value={value} name={name} ref={ref}
                                label="Email" placeholder="you@mantine.dev" type={'email'} required />
                        )} />
                        <Button fullWidth mt="xl" type='submit'>
                            Continue
                        </Button>
                        {errors && errors["error"] ? < Alert icon={<FiAlertTriangle size={16} />} title="Error" mt="xl" color="red">
                            {errors["error"].message}
                        </Alert> : ""}
                    </Paper>
                </Container>}
            </form>
        </>
    );
}
//


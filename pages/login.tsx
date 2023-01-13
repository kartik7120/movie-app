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
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleButton from '../components/SocialButton';
import Head from 'next/head';
import { FiAlertTriangle } from 'react-icons/fi';

interface Sign {
    email: string,
    password: string,
    error: ""
}

export default function SignIn() {

    const { register, reset, formState: { errors }, handleSubmit, setError, control, resetField } = useForm<Sign>({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const watch = useWatch<Sign>({
        control,
    })

    const onSubmit: SubmitHandler<Sign> = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data["email"], data["password"])
                .then((userCredential) => {
                    const user = userCredential.user;
                })
        } catch (error: any) {
            if (error.code === "auth/wrong-password")
                setError("password", { type: "wrongPass", message: `${error.message}` });
            else
                setError("error", { type: "custom", message: `${error.message}` });
            resetField("password");
            console.log(`error occured while signin = ${error.message} and code = ${error.code}`);
        }
    };
    const onError: SubmitErrorHandler<Sign> = (error) => console.log(error);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Log in</title>
            </Head>
            <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
                <Container size={420} my={40}>
                    <Title
                        align="center"
                        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                    >
                        Welcome to IMDb!
                    </Title>
                    <Text color="dimmed" size="sm" align="center" mt={5}>
                        Do not have a account ?
                        <Link href='/signin'>
                            <Text underline color="blue">Sign in</Text>
                        </Link>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <GoogleButton />
                        <Divider label="Or continue with email" labelPosition="center" my="lg" />
                        <Controller control={control} name="email" rules={{ required: true }} render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                            formState: { errors },
                        }) => (
                            <TextInput error={`${error ? errors["email"]?.type === "exists" ? "Please Log-in this email is already in use" : errors["email"]?.message : ""}`} onBlur={onBlur}
                                onChange={onChange} value={value} name={name} ref={ref}
                                label="Email" placeholder="you@mantine.dev" type={'email'} required />
                        )} />
                        <Controller control={control} name="password" rules={{ required: "Password must be of minimum 8 length", minLength: 8 }} render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                            formState: { errors },
                        }) => (
                            <PasswordInput error={`${error ? errors["password"]?.type === "wrongPass" ? "Wrong password" : errors["password"]!.message : ""}`}
                                onChange={onChange} onBlur={onBlur} value={value} ref={ref}
                                name={name} label="Password" placeholder="Your password" required mt="md" />
                        )} />
                        <Group position="apart" mt="lg">
                            <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" type='submit'>
                            Log in
                        </Button>
                        {errors && errors["error"] ? < Alert icon={<FiAlertTriangle size={16} />} title="Error" mt="xl" color="red">
                            {errors["error"].message}
                        </Alert> : ""}
                    </Paper>
                </Container>
            </form>
        </>
    );
}
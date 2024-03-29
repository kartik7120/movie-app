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
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import GoogleButton from '../components/SocialButton';
import { FiAlertTriangle } from 'react-icons/fi';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';

interface Sign {
    email: string,
    password: string,
    password2: string,
    error: ""
}

export default function SignIn() {

    const router = useRouter();

    const { register, reset, formState: { errors }, handleSubmit, setError, control, resetField } = useForm<Sign>({
        defaultValues: {
            email: "",
            password: "",
            password2: ""
        },
    })

    const watch = useWatch<Sign>({
        control,
    })

    const pass1 = watch["password"];

    const onSubmit: SubmitHandler<Sign> = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data["email"], data["password"])
                .then((userCredential) => {
                    const user = userCredential.user;
                })
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use")
                setError("email", { type: "exists", message: `${error.message}` });
            else
                setError("error", { type: "custom", message: `${error.message}` });
            resetField("password");
            resetField("password2");
            console.log(`${error.code}`)
        }
    };
    const onError: SubmitErrorHandler<Sign> = (error) => console.log(error);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sign In</title>
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
                        Do you have a account ?
                        <Link href={`/login?from=${router.query.from || '/'}`}><Text underline color="blue">Log in</Text></Link>
                        {/* <Text color="blue" variant='link' onClick={() => router.push({
                            pathname: "/login",
                            query: {
                                from: router.query.from || '/'
                            },
                            slashes: true
                        })}>Log in</Text> */}
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
                            <PasswordInput error={`${error ? errors["password"]!.message : ""}`}
                                onChange={onChange} onBlur={onBlur} value={value} ref={ref}
                                name={name} label="Password" placeholder="Your password" required mt="md" />
                        )} />
                        <Controller control={control} name="password2" rules={{
                            required: "Password must be of minimum 8 length",
                            minLength: 8,
                            validate: (value) => {
                                if (value === pass1) {
                                    return true;
                                }
                                else
                                    return "Password and Re-entered password do not match";
                            }
                        }} render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { isTouched, isDirty, error },
                            formState: { errors },
                        }) => (
                            <PasswordInput error={`${error ? errors["password2"]!.message : ""}`} onChange={onChange} onBlur={onBlur} value={value} ref={ref} name={name} label="Re-enter password" placeholder="Your password" required mt="md" />
                        )} />
                        <Group position="apart" mt="lg">
                            <Link href={`/forgotPassword`}>
                                <Text variant='link'> Forgot password?</Text>
                            </Link>
                        </Group>
                        <Button fullWidth mt="xl" type='submit'>
                            Sign in
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
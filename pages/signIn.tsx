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
} from '@mantine/core';

import { useForm, Controller, useWatch } from "react-hook-form";
import { SubmitHandler, SubmitErrorHandler } from 'react-hook-form/dist/types';
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import GoogleButton from '../components/SocialButton';

interface Sign {
    email: string,
    password: string,
    password2: string
}

export default function SignIn() {

    const { register, reset, formState: { errors }, handleSubmit, setError, control } = useForm<Sign>({
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
            console.log(`error code = ${error.code} and error message = ${error.message}`)
        }
    };
    const onError: SubmitErrorHandler<Sign> = (error) => console.log(error);

    return (
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
                    <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
                        Log in
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <GoogleButton />
                    <Divider label="Or continue with email" labelPosition="center" my="lg" />
                    <Controller control={control} name="email" rules={{ required: true }} render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { isTouched, isDirty, error },
                        formState: { errors },
                    }) => (
                        <TextInput error={`${error ? errors["email"] : ""}`} onBlur={onBlur}
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
                        <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button fullWidth mt="xl" type='submit'>
                        Sign in
                    </Button>
                </Paper>
            </Container>
        </form>
    );
}
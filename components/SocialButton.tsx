import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@mantine/core";
import React from "react";
import { useRouter } from "next/dist/client/router";


export default function GoogleButton() {

    const router = useRouter();

    const provider = new GoogleAuthProvider();

    async function handleSignin() {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            // The signed-in user info.
            if (router.query && router.query.from) {
                router.push({
                    pathname: router.query.from as string,
                    slashes: true
                });
            }
            else
                router.push('/');
            const user = result.user;
        }).catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
    }

    return <>
        <Button variant="default" fullWidth leftIcon={<FcGoogle />} onClick={handleSignin}>Google</Button>
    </>

}
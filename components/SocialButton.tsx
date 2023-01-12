import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@mantine/core";
import React from "react";


export default function GoogleButton() {
    const provider = new GoogleAuthProvider();

    async function handleSignin() {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential!.accessToken;
            // The signed-in user info.
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
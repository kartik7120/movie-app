import { ActionIcon, Tooltip, useMantineTheme } from "@mantine/core";
import { AiOutlineHeart, AiOutlineUnorderedList, AiTwotoneStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

interface Props {
    id: number,
    mediaType: "MOVIES" | "SHOWS",
}

export default function ActionButtons(props: Props) {
    const theme = useMantineTheme();
    const auth = getAuth();
    const [watchList, setWatchList] = useState(false);
    const [favList, setFavList] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (user !== currentUser) {
                    setUser(currentUser);
                }
            }
            else {
                setUser(null);
            }
        })

        if (user) {
            const q = query(collection(db, "users", user.uid, "watchlist"), where("id", "==", `${props.id}`))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        setWatchList(true);
                    }
                    if (change.type === "removed") {
                        setWatchList(false);
                    }
                })
            })

            const q2 = query(collection(db, "users", user.uid, "favlist"), where("id", "==", `${props.id}`))
            const unsubscribe2 = onSnapshot(q2, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log(change.doc.data());
                    if (change.type === "added") {
                        setFavList(true);
                    }
                    if (change.type === "removed") {
                        setFavList(false);
                    }
                })
            })

            return () => {
                unsubscribe();
                unsubscribe2();
            }
        }

    }, [props.id, user])


    async function handleClick() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "watchlist", `${props.id}`);
            await setDoc(docRef, {
                id: props.id,
                mediaType: props.mediaType === "MOVIES" ? "movie" : "tv"
            }, { merge: true }).then((value) => {
                console.log(`added to watch list`);
            }).catch((err) => {
                console.log(`error occured while adding data to database`);
            })
        }
    }

    async function handleFavouriteButton() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "favlist", `${props.id}`);
            await setDoc(docRef, {
                id: props.id,
                mediaType: props.mediaType === "MOVIES" ? "movie" : "tv"
            }, { merge: true }).then((value) => {
                console.log(`added to favourite list`);
            }).catch((err) => {
                console.log(`error occured while adding data to database`);
            })
        }
    }

    async function removeWatchList() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "watchlist", `${props.id}`);
            await deleteDoc(docRef).then((value) => {
                console.log(`doc deleted from watchlist`);
                setWatchList(false);
            }).catch((err) => {
                console.log(`error occured while deleting watchlist`);
            })
        }
    }

    async function removeFavList() {
        if (user) {
            const docRef = doc(db, "users", user.uid, "favlist", `${props.id}`);
            await deleteDoc(docRef).then((value) => {
                console.log(`doc deleted from watchlist`);
                setFavList(false);
            }).catch((err) => {
                console.log(`error occured while deleting watchlist`);
            })
        }
    }

    return <>
        <Tooltip label="Add to List" position="bottom">
            <ActionIcon size="xl" mr={5}>
                <AiOutlineUnorderedList color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
        <Tooltip label={!favList ? "Add to Favourites" : "Remove from your Favourites"} position="bottom">
            <ActionIcon disabled={user ? false : true} size="xl" mr={5} onClick={!favList ? handleFavouriteButton : removeFavList}>
                <AiOutlineHeart fill={favList ? "red" : "white"} color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
        <Tooltip label={user !== null ? !watchList ? "Add to your watchlist" : "Remove from your watchlist" : "Log in to add to Favourites"} position="bottom">
            <ActionIcon disabled={user ? false : true} size="xl" mr={5} onClick={!watchList ? handleClick : removeWatchList}>
                <BsBookmark fill={watchList ? "cyan" : "white"} color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
        <Tooltip label="Rate it!" position="bottom">
            <ActionIcon component="a" href={`#review`} size="xl" mr={5}>
                <AiTwotoneStar href={`#review`} color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
    </>
}
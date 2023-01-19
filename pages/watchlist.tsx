import { Container, Tabs, Title } from "@mantine/core";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import WatchListItem from "../components/WatchListItem";
import { db } from "../firebase";
import Head from "next/head";
import { useRouter } from "next/router";

export default function WatchList(): JSX.Element {
    const auth = getAuth();
    const user = auth.currentUser;
    const [watchList, setWatchList] = useState<any[] | null>(null);
    const [favList, setFavList] = useState<any[] | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            const colRef = collection(db, "users", user?.uid, "watchlist");
            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                const arr = new Array(0);
                snapshot.forEach((ele) => {
                    arr.push(ele.data());
                })
                setWatchList(arr);
            })
            
            const colRef2 = collection(db, "users", user.uid, "favlist");
            const unsubscribe2 = onSnapshot(colRef2, (snapshot) => {
                const arr = new Array(0);
                snapshot.forEach((ele) => {
                    arr.push(ele.data());
                })
                setFavList(arr);
            })

            return () => {
                unsubscribe();
                unsubscribe2();
            }
        }
        
    }, [user])

    if (user === null) {
        router.push(`/login`);
        return <p>Login to create or edit Watch list</p>
    }
    
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Your Watchlist</title>
        </Head>
        <Container px="xl" size="xl">
            <Title order={2} mt={10} size="h1">WatchList</Title>
            <Tabs variant="default" mt={30} defaultValue="planToWatch">
                <Tabs.List>
                    <Tabs.Tab value="planToWatch">Plan To Watch</Tabs.Tab>
                    <Tabs.Tab value="favourite">Favourite</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="planToWatch">
                    {watchList && watchList.map((watch) => {
                        return <WatchListItem id={watch.id} mediaType={watch.mediaType.toUpperCase()} key={watch.id} />
                    })}
                </Tabs.Panel>
                <Tabs.Panel value="favourite">
                    {favList && favList.map((watch) => {
                        return <WatchListItem id={watch.id} mediaType={watch.mediaType.toUpperCase()} key={watch.id} />
                    })}
                </Tabs.Panel>
            </Tabs>
        </Container>
    </>
}
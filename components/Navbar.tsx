import navbar from "../styles/navbar.module.css";
import { FaImdb } from "react-icons/fa";
import { ActionIcon, Button, Select, Divider, Drawer, Menu, Text, Collapse, Center, Stack } from "@mantine/core";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { TextInput } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillBookmarkPlusFill, BsMoon, BsSun } from "react-icons/bs";
import { Avatar, Modal } from "@mantine/core";
import React, { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { getHotkeyHandler } from '@mantine/hooks';
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function Navbar(): JSX.Element {
    const user = auth.currentUser;
    const [signedIn, setSignedIn] = React.useState(false);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (signedIn === false) {
                setSignedIn(true);
            }
        }
        else {
            if (signedIn === true) {
                setSignedIn(false);
            }
        }
    });

    const router = useRouter();
    const [opened, setOpened] = React.useState<boolean>(false);
    const [modelOpened, setModelOpened] = React.useState(false);
    const [opened2, setOpened2] = React.useState(false);

    const [value, setValue] = React.useState("");

    useEffect(() => {
        if (user) {
            setSignedIn(true);
        }
    }, [user])

    function handleSubmit(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
        router.push(`/search?query=${value}`);
    }

    async function handleSignOut() {
        await signOut(auth).then(() => {
            console.log('user logged out');
            setSignedIn(false);
        }).catch((error) => {
            console.log(`error occured while logging out the user = ${error}`);
        })
    }

    return <>
        <nav className={navbar.wrapper}>
            <Modal opened={modelOpened} fullScreen={true} transition="slide-down" exitTransitionDuration={100}
                onClose={() => setModelOpened(false)} title="Menu Model" >
                <h1>Look at me I am a web developer</h1>
                <Link href={`/movie/nowpopular`}><Text>Now Popular Movies</Text></Link>
                <Link href={`/movie/nowplaying`}><Text>Now Playing Movies</Text></Link>
                <Link href={`/movie/upcoming`}><Text>Upcoming Movies</Text></Link>
                <Link href={`/tv/nowplaying`}><Text>Now Playing Shows</Text></Link>
                <Link href={`/tv/nowpopular`}><Text>Now Popular Shows</Text></Link>
            </Modal>
            <FaImdb size={50} color="#F08C00" className={navbar.cursor} onClick={() => router.push("/")} />
            <Button leftIcon={<AiOutlineMenu />} variant="filled" onClick={() => setModelOpened(true)}
                className={navbar.navMenu}>Menu</Button>
            <TextInput value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
            }} type="text" placeholder="Search" icon={<BiSearchAlt />} style={{ width: "60%" }} rightSectionWidth={100}
                onKeyDown={getHotkeyHandler([
                    ['enter', handleSubmit]
                ])} />
            <Drawer opened={opened} onClose={() => setOpened(false)} title="Menu" padding="xl" size="md">
                <div>Menu Content</div>
                <div>Watch list</div>
            </Drawer>
            <ActionIcon className={navbar.drawer} onClick={() => setOpened(true)}>
                <FiMenu />
            </ActionIcon>
            <Divider orientation="vertical" size="md" m={0} className={navbar.divider} />
            <Link href={`/watchlist`}>
                <Button leftIcon={<BsFillBookmarkPlusFill />} variant="filled" className={navbar.watchlist}>Watchlist</Button>
            </Link>

            {signedIn ? <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button leftIcon={<Avatar src={null} radius="md" />} className={navbar.profileBtn} variant="subtle">Profile</Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={handleSignOut}>
                        Sign out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu> : <Button id="login" className={navbar.profileBtn} onClick={() => router.push({
                pathname: "/login",
                query: {
                    from: router.asPath
                },
                slashes: true
            })} variant="subtle">Log In</Button>}
            <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
            >
                {dark ? <BsSun size={18} /> : <BsMoon size={18} />}
            </ActionIcon>
        </nav>
        <nav className={navbar.wrapper2}>
            <div className={navbar.wrapper2Div}>
                <Link href={`/`}>
                    <FaImdb size={50} color="#F08C00" />
                </Link>
                <Drawer opened={opened} onClose={() => setOpened(false)} title="Menu" padding="xl" size="md">
                    <div>Menu Content</div>
                    <Link href={`/watchlist`} onClick={() => setOpened(false)}>
                        <Text variant="text" size="lg">WatchList</Text>
                    </Link>
                </Drawer>
                <ActionIcon className={navbar.drawer} onClick={() => setOpened(true)}>
                    <FiMenu />
                </ActionIcon>
            </div>
            <div className={navbar.wrapper2Div}>
                <ActionIcon onClick={() => setOpened2(o => !o)}>
                    {!opened2 ? <BiSearchAlt /> : <AiOutlineClose />}
                </ActionIcon>
                {signedIn ? <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon>
                            <Avatar src={null} radius="md" />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={handleSignOut}>
                            Sign out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu> :
                    <Button id="login" className={navbar.profileBtn} onClick={() => router.push({
                        pathname: "/login",
                        query: {
                            from: router.asPath
                        },
                        slashes: true
                    })} variant="subtle">Log In</Button>}
            </div>
        </nav>
        <Collapse in={opened2}>
            <Center>
                <TextInput value={value} size="md" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                }} type="text" placeholder="Search" icon={<BiSearchAlt />} style={{ width: "60%" }} rightSectionWidth={100}
                    onKeyDown={getHotkeyHandler([
                        ['enter', handleSubmit]
                    ])} />
            </Center>
        </Collapse>
    </>
}
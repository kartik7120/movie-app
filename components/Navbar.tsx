import navbar from "../styles/navbar.module.css";
import { FaImdb } from "react-icons/fa";
import { ActionIcon, Button, Select, Divider, Drawer } from "@mantine/core";
import { AiOutlineMenu } from "react-icons/ai";
import { TextInput } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillBookmarkPlusFill, BsMoon, BsSun } from "react-icons/bs";
import { Avatar, Modal } from "@mantine/core";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { getHotkeyHandler } from '@mantine/hooks';
import { useRouter } from "next/router";
import { useMantineColorScheme } from "@mantine/core";

export default function Navbar(): JSX.Element {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const router = useRouter();
    const [opened, setOpened] = React.useState<boolean>(false);
    const [modelOpened, setModelOpened] = React.useState(false);
    const [value, setValue] = React.useState("");

    function handleSubmit(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) {
        router.push(`/search?query=${value}`);
    }

    return <> <nav className={navbar.wrapper}>
        <Modal opened={modelOpened} fullScreen={true} transition="slide-down" exitTransitionDuration={100}
            onClose={() => setModelOpened(false)} title="Menu Model" >
            <h1>Look at me I am a web developer</h1>
        </Modal>
        <FaImdb size={50} color="#F08C00" className={navbar.cursor} onClick={() => router.push("/")} />
        <Button leftIcon={<AiOutlineMenu />} variant="filled" onClick={() => setModelOpened(true)}
            className={navbar.navMenu}>Menu</Button>
        <TextInput value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        }} type="text" placeholder="Search" icon={<BiSearchAlt />} style={{ width: "60%" }} rightSectionWidth={100}
            rightSection={<Select placeholder="Select" data={[
                { value: "all", label: "All" }
            ]} />} onKeyDown={getHotkeyHandler([
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
        <Button leftIcon={<BsFillBookmarkPlusFill />} variant="filled" className={navbar.watchlist}>Watchlist</Button>
        <Button leftIcon={<Avatar src={null} radius="md" />} className={navbar.profileBtn} variant="subtle">Profile</Button>
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
                <FaImdb size={50} color="#F08C00" />
                <Drawer opened={opened} onClose={() => setOpened(false)} title="Menu" padding="xl" size="md">
                    <div>Menu Content</div>
                    <div>Watch list</div>
                </Drawer>
                <ActionIcon className={navbar.drawer} onClick={() => setOpened(true)}>
                    <FiMenu />
                </ActionIcon>
            </div>
            <div className={navbar.wrapper2Div}>
                <ActionIcon>
                    <BiSearchAlt />
                </ActionIcon>
                <ActionIcon>
                    <Avatar src={null} radius="md" />
                </ActionIcon>
            </div>
        </nav>
    </>
}
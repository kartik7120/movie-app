import { createStyles } from "@mantine/styles";
import navbar from "../styles/navbar.module.css";
import { FaImdb } from "react-icons/fa";
import { ActionIcon, Button, Select, Divider, Drawer, MediaQuery } from "@mantine/core";
import { AiOutlineMenu } from "react-icons/ai";
import { TextInput } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Avatar } from "@mantine/core";
import React from "react";
import { FiMenu } from "react-icons/fi";

const useStyles = createStyles((theme, params, getRef) => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "42%"
    },
    wrapper2: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "30%"
    }
}))

export default function Navbar(): JSX.Element {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState<boolean>(false);

    return <> <nav className={navbar.wrapper}>
        <FaImdb size={50} color="#F08C00" />
        <Button leftIcon={<AiOutlineMenu />} variant="filled" className={navbar.navMenu}>Menu</Button>
        <TextInput placeholder="Search" icon={<BiSearchAlt />} style={{ width: "60%" }} rightSectionWidth={100}
            rightSection={<Select placeholder="Select" data={[
                { value: "all", label: "All" }
            ]} />} />
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
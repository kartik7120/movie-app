import { createStyles } from "@mantine/styles";
import navbar from "../styles/navbar.module.css";
import { FaImdb } from "react-icons/fa";
import { ActionIcon, Button, Select, Divider } from "@mantine/core";
import { AiOutlineMenu } from "react-icons/ai";
import { TextInput } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Avatar } from "@mantine/core";

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

    return <div className={navbar.wrapper}>
        <FaImdb size={50} color="#F08C00" />
        <Button leftIcon={<AiOutlineMenu />} variant="filled">Menu</Button>
        <TextInput placeholder="Search" icon={<BiSearchAlt />} style={{ width: "60%" }} rightSectionWidth={100}
            rightSection={<Select placeholder="Select" data={[
                { value: "all", label: "All" }
            ]} />} />
        <Divider orientation="vertical" size="md" m={0} />
        <Button leftIcon={<BsFillBookmarkPlusFill />} variant="filled">Watchlist</Button>
        <Button leftIcon={<Avatar src={null} radius="md" />} variant="subtle">Profile</Button>
    </div>
}
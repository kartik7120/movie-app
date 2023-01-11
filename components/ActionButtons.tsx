import { ActionIcon, Tooltip, useMantineTheme } from "@mantine/core";
import { AiOutlineHeart, AiOutlineUnorderedList, AiTwotoneStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

export default function ActionButtons() {
    const theme = useMantineTheme();
    return <>
        <Tooltip label="Add to List" position="bottom">
            <ActionIcon size="xl" mr={5}>
                <AiOutlineUnorderedList color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
        <Tooltip label="Add to Favourites" position="bottom">
            <ActionIcon size="xl" mr={5}>
                <AiOutlineHeart color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
        <Tooltip label="Add to your watchlist" position="bottom">
            <ActionIcon size="xl" mr={5}>
                <BsBookmark color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
        <Tooltip label="Rate it!" position="bottom">
            <ActionIcon size="xl" mr={5}>
                <AiTwotoneStar color={theme.colorScheme === "dark" ? theme.white : theme.black} />
            </ActionIcon>
        </Tooltip>
    </>
}
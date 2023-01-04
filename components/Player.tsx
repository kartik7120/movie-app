import { ActionIcon, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import ReactPlayer from "react-player";
import styles from "../styles/videos.module.css";

interface Props {
    keyUrl: string
}

export default function Player(props: Props): JSX.Element {
    const matches = useMediaQuery('(max-width:530px)');
    const isMobile = useMediaQuery('(max-width: 650px)');
    const matches1 = useMediaQuery('(max-width:1210px)');
    const matches2 = useMediaQuery("(max-width:1012px)");
    const matches3 = useMediaQuery("(max-width:1097px)");
    const matches4 = useMediaQuery("(max-width:492px)");

    const [opened, setOpened] = React.useState(false);
    const [url, setUrl] = React.useState<string | undefined>(undefined);

    return <>
        <Modal size="auto" fullScreen={isMobile} closeOnClickOutside={false} centered opened={opened} onClose={() => {
            setOpened(false);
            setUrl(undefined);
        }}>
            <ReactPlayer playing stopOnUnmount width={isMobile ? 500 : matches3 ? undefined : 1000}
                height={isMobile ? 300 : matches3 ? undefined : 500}
                controls={true} url={url} />
        </Modal>
        <div className={styles.playerWrapper}>
            <ReactPlayer light={true} width={matches ? 300 : 400}
                height={matches ? 150 : 200} previewTabIndex={1}
                controls={false} url={`https://www.youtube.com/watch?v=${props.keyUrl}`} />
            <div className={styles.playerOverley}>
                <ActionIcon size="xl"
                    opacity={1} onClick={() => {
                        if (matches === false) {
                            setUrl(`https://www.youtube.com/watch?v=${props.keyUrl}`);
                            setOpened(true);
                        }
                    }}>
                    {matches ? <Link target="_blank" href={`https://www.youtube.com/watch?v=${props.keyUrl}`}>
                        <BsFillPlayCircleFill color="black" size={50} />
                    </Link> :
                        <BsFillPlayCircleFill color="black" size={50} />}
                </ActionIcon>
            </div>
        </div>
    </>
}
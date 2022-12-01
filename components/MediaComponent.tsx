import { Tabs } from "@mantine/core";
import Posters from "./Posters";
import Videos from "./Videos";
import Backdrops from "./Backdrop";

interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV",
    first?: number
}

export default function MediaComponent(props: Props): JSX.Element {
    return (
        <Tabs defaultValue="most popular">
            <Tabs.List>
                <Tabs.Tab value="most popular">Most Popular</Tabs.Tab>
                <Tabs.Tab value="videos">Videos</Tabs.Tab>
                <Tabs.Tab value="backdrops">Backdrops</Tabs.Tab>
                <Tabs.Tab value="posters">Posters</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="most popular">Most Popular Panel</Tabs.Panel>
            <Tabs.Panel value="videos"><Videos id={props.id} sourceMedia={props.sourceMedia} first={props.first} /></Tabs.Panel>
            <Tabs.Panel value="backdrops"><Backdrops id={props.id} sourceMedia={props.sourceMedia} first={props.first} /></Tabs.Panel>
            <Tabs.Panel value="posters"><Posters id={props.id} sourceMedia={props.sourceMedia} first={props.first} /></Tabs.Panel>
        </Tabs>
    )
}
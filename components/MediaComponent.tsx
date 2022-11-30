import { Tabs } from "@mantine/core";

export default function MediaComponent(): JSX.Element {
    return (
        <Tabs defaultValue="most popular">
            <Tabs.List>
                <Tabs.Tab value="most popular">Most Popular</Tabs.Tab>
                <Tabs.Tab value="videos">Videos</Tabs.Tab>
                <Tabs.Tab value="backdrops">Backdrops</Tabs.Tab>
                <Tabs.Tab value="posters">Posters</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="most popular">Most Popular Panel</Tabs.Panel>
            <Tabs.Panel value="videos">Videos</Tabs.Panel>
            <Tabs.Panel value="backdrops">Backdrops</Tabs.Panel>
            <Tabs.Panel value="posters">Posters</Tabs.Panel>
        </Tabs>
    )
}
import { Group, MediaQuery, Title } from "@mantine/core";

interface Props {
    children: React.ReactNode,
    heading: string,
}

export default function CaroselHeading(props: Props): JSX.Element {
    return <Group align="center" position='left' mb="sm">
        <MediaQuery styles={{ display: "none" }} query="(min-width:586px)">
            <Title order={1} weight={300} align="center" size={23}>
                {props.heading}
            </Title>
        </MediaQuery>
        <MediaQuery query='(max-width:586px)' styles={{ display: "none" }}>
            <Title order={1} weight={500} align="center" size={30}>
                {props.heading}
            </Title>
        </MediaQuery>
        {props.children}
    </Group>
}
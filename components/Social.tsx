import { gql, useQuery } from "@apollo/client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BiLink } from "react-icons/bi";

const SOCIAL = gql`
    query GetExternalIDs($getExternalIDsId: ID!, $sourceMedia: SourceMedia!) {
    getExternalIDs(id: $getExternalIDsId, sourceMedia: $sourceMedia) {
    facebook_id
    imdb_id
    instagram_id
    twitter_id
  }
}
`

interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV",
    homepage?: string
}

export default function Social(props: Props): JSX.Element {

    const { loading, data, error } = useQuery(SOCIAL, {
        variables: {
            getExternalIDsId: props.id,
            sourceMedia: props.sourceMedia
        }
    })

    if (loading) {
        return <p>Links are loading...</p>
    }

    if (error) {
        return <p>Error occured: {`${error}`}</p>
    }

    return <Group position="left" pl={30}>

        {data.getExternalIDs.twitter_id && <Tooltip label="Visit Twitter" color="blue" withArrow>
            <ActionIcon size="xl" component="a" target="_blank" href={`https://twitter.com/${data.getExternalIDs.twitter_id}`}>
                <AiOutlineTwitter size={30} />
            </ActionIcon>
        </Tooltip>
        }

        {data.getExternalIDs.facebook_id &&
            <Tooltip label="Visit Facebook" color="blue" withArrow>
                <ActionIcon size="xl" component="a" target="_blank" href={`https://www.facebook.com/${data.getExternalIDs.facebook_id}`}>
                    <AiFillFacebook size={30} />
                </ActionIcon>
            </Tooltip>
        }

        {data.getExternalIDs.instagram_id &&
            <Tooltip label="Visit Instagram" color="blue" withArrow>
                <ActionIcon size="xl" component="a" target="_blank" href={`https://www.facebook.com/${data.getExternalIDs.instagram_id}`}>
                    <AiFillInstagram size={30} />
                </ActionIcon>
            </Tooltip>
        }

        {props.homepage && <Tooltip label="Visit Homepage" color="blue" withArrow>
            <ActionIcon size="xl" component="a" target="_blank" href={`${props.homepage}`}>
                <BiLink size={30} />
            </ActionIcon>
        </Tooltip>}
    </Group>
}
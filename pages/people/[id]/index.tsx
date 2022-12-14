import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import client from "../../../apollo-client";
import { PeopleDetails, ExternalIds } from "../../../schemaTypes";
import Head from "next/head";
import ImageCard from "../../../components/ImageCard";
import { BsTwitter } from "react-icons/bs";
import { ActionIcon, Group, Spoiler, Stack, Text, Title } from "@mantine/core";
import { GrFacebook } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import styles from "../../../styles/people.module.css";
import { getAge } from "../../../lib/util";

const PEOPLE_DETAILS = gql`
    query PeopleDetails($peopleDetailsId: ID!) {
    peopleDetails(id: $peopleDetailsId) {
    biography
    also_known_as
    birthday
    deathday
    gender
    imdb_id
    name
    place_of_birth
    profile_path
    homepage
    known_for_department
  }
  getPeopleExternalIDs(id: $peopleDetailsId) {
    instagram_id
    twitter_id
    facebook_id
  }
}
`

interface Props {
    people: PeopleDetails,
    externalIds: ExternalIds
}

export default function People(props: Props): JSX.Element {

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{props.people.name}</title>
        </Head>
        <div className={styles.wrapper}>
            <div>
                <ImageCard width={300} height={500} imgUrl={props.people.profile_path!} />
                <div className={styles.iconWrapper}>
                    <ActionIcon variant="outline" size="lg" m={10} component="a" target="_blank"
                        href={`https://www.twitter.com/${props.externalIds.twitter_id}`}>
                        <BsTwitter size={30} />
                    </ActionIcon>
                    <ActionIcon variant="outline" size="lg" m={10} component="a" target="_blank"
                        href={`https://www.facebook.com/${props.externalIds.facebook_id}`}>
                        <GrFacebook size={30} />
                    </ActionIcon>
                    <ActionIcon variant="outline" size="lg" m={10} component="a" target="_blank"
                        href={`https://www.instagram.com/${props.externalIds.instagram_id}`}>
                        <AiFillInstagram size={30} />
                    </ActionIcon>
                </div>
                <div>
                    <Text variant="text" fw="bold" size="xl">Personal Info</Text>
                    <span className={styles.textWrapper}>
                        <Text variant="text" fw="bold" size="md">Known For</Text>
                        <Text variant="text" size="md">{props.people.known_for_department}</Text>
                    </span>
                    <span className={styles.textWrapper}>
                        <Text variant="text" fw="bold" size="md">Gender</Text>
                        <Text variant="text" size="md">{props.people.gender}</Text>
                    </span>
                    <span className={styles.textWrapper}>
                        <Text variant="text" fw="bold" size="md">Birthday</Text>
                        <Text variant="text" size="md">{props.people.birthday} ({getAge(props.people.birthday)} years old)</Text>
                    </span>
                    <span className={styles.textWrapper}>
                        <Text variant="text" fw="bold" size="md">Place of Birth</Text>
                        <Text variant="text" size="md">{props.people.place_of_birth}</Text>
                    </span>
                    <Text variant="text" fw="bold" size="md">Also Known As</Text>
                    <ul className={styles.listWrapper}>
                        {props.people.also_known_as?.map((ele: typeof props.people.also_known_as[0], index: number) => {
                            return <li className={styles.list} key={Math.random() * index * 69}>
                                {ele}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <div>
                Second Section
                <Title order={2} size="h1">{props.people.name}</Title>
                <Title order={3} size="h3">Biography</Title>
                <Spoiler maxHeight={140} showLabel="Read More" hideLabel="Hide">
                    <Text variant="text" size="md" style={{ whiteSpace: "pre-line" }}>{props.people.biography}</Text>
                </Spoiler>
            </div>
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;

    if (params && (params.id === undefined || params.id === null)) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: PEOPLE_DETAILS,
        variables: {
            peopleDetailsId: params && params.id ? params.id : null
        }
    })

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            people: data.peopleDetails,
            externalIds: data.getPeopleExternalIDs
        }
    }
}
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import client from "../../../apollo-client";
import { PeopleDetails, ExternalIds, FormattedCombinedCredits } from "../../../schemaTypes";
import Head from "next/head";
import ImageCard from "../../../components/ImageCard";
import { BsTwitter } from "react-icons/bs";
import { ActionIcon, Group, Spoiler, Stack, Text, Title } from "@mantine/core";
import { GrFacebook } from "react-icons/gr";
import { AiFillInstagram } from "react-icons/ai";
import styles from "../../../styles/people.module.css";
import { getAge } from "../../../lib/util";
import React from "react";
import { Timeline } from '@mantine/core';
import { BiRadioCircleMarked } from "react-icons/bi";
import Link from "next/link";

const PEOPLE_DETAILS = gql`
    query PeopleDetails($peopleDetailsId: ID!,$format:Boolean!) {
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
  getPeopleCredit(id: $peopleDetailsId, format: $format) {
    ... on FormattedCombinedCredits {
      crew {
        key
        value {
          job
          release_date
          id
          title
          name
          first_air_date
        }
      }
      cast {
        key
        value {
          id
          first_air_date
          name
          title
          character
          release_date
        }
      }
    }
  }
}
`

interface Props {
    people: PeopleDetails,
    externalIds: ExternalIds,
    credit: FormattedCombinedCredits
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
            <div className={styles.rightWrapper}>
                <Title order={2} size="h1">{props.people.name}</Title>
                <Title order={3} size="h3">Biography</Title>
                <Spoiler maxHeight={140} showLabel="Read More" hideLabel="Hide">
                    <Text variant="text" size="md" style={{ whiteSpace: "pre-line" }}>{props.people.biography}</Text>
                </Spoiler>
                {props.credit.cast?.map((ele, index: number) => {
                    return (<div className={styles.timeline} key={Math.random() * index * 5}>
                        <Title order={3} size="h2">{ele?.key?.toUpperCase()}</Title>
                        <Timeline mt={20} active={ele?.value?.length} bulletSize={24} lineWidth={2}>
                            {ele?.value?.map((movie, index: number) => {
                                return <Timeline.Item
                                    lineActive={JSON.stringify(movie?.release_date).length === 2 && JSON.stringify(movie?.first_air_date).length === 4 ? false : true}
                                    key={Math.random() * 55 * index}
                                    bullet={<BiRadioCircleMarked size={12} />}
                                    title={<><Link href={`/movie/${movie?.id}`}><Text variant="text">{movie?.title || movie?.name}
                                    </Text></Link> <Text color="dimmed" component="span" inline>as {movie?.character} ({movie?.first_air_date?.substring(0, 4) || movie?.release_date?.substring(0, 4)})</Text></>}>
                                </Timeline.Item>
                            })}
                        </Timeline>
                    </div>)
                })}
                {props.credit.crew?.map((ele, index: number) => {
                    return <div className={styles.timeline} key={Math.random() * index * 7}>
                        <Title order={3} size="h2">{ele?.key?.toUpperCase()}</Title>
                        <Timeline mt={20} active={ele?.value?.length} bulletSize={24} lineWidth={2}>
                            {ele?.value?.map((crew, index: number) => {
                                return <Timeline.Item
                                    lineActive={JSON.stringify(crew?.release_date).length === 2 && JSON.stringify(crew?.first_air_date).length === 4 ? false : true}
                                    key={Math.random() * 55 * index}
                                    bullet={<BiRadioCircleMarked size={12} />}
                                    title={<><Link href={`/movie/${crew?.id}`}><Text variant="text">{crew?.title || crew?.name}
                                    </Text></Link> <Text color="dimmed" component="span" inline>as {crew?.department} ({crew?.first_air_date?.substring(0, 4) || crew?.release_date?.substring(0, 4)})</Text></>}>
                                </Timeline.Item>
                            })}
                        </Timeline>
                    </div>
                })}
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
            peopleDetailsId: params && params.id ? params.id : null,
            format: true
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
            externalIds: data.getPeopleExternalIDs,
            credit: data.getPeopleCredit
        }
    }
}
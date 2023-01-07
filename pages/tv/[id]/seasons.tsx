import { gql } from "@apollo/client";
import { GetServerSideProps } from "next/types";
import client from "../../../apollo-client";
import MoreTitle from "../../../components/MoreTitle";
import { Season } from "../../../schemaTypes";
import Head from "next/head";
import ImageCard from "../../../components/ImageCard";
import { Spoiler, Text } from "@mantine/core";
import styles from "../../../styles/seasons.module.css";
import Link from "next/link";

const SEASONS = gql`
    query GetTvDetails($getTvDetailsId: ID!) {
    getTvDetails(id: $getTvDetailsId) {
    id
    name
    seasons {
      name
      poster_path
      season_number
      episode_count
      air_date
      overview
    }
  }
}
`

interface Props {
    season: Season[],
    title: string,
    id: number
}

export default function Seasons(props: Props) {
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{props.title} - Seasons</title>
        </Head>
        <MoreTitle id={props.id} title={props.title || "Title"} sourceMedia="TV" />
        <div className={styles.wrapper}>
            {props.season.map((season, index: number) => {
                return <div key={season.season_number} className={styles.wrapper2}>
                    <div>
                        <Link href={`/tv/${props.id}/seasons/${season.season_number}`}>
                            <ImageCard imgUrl={season.poster_path} w="w200" width={200} height={300} />
                        </Link>
                    </div>
                    <div className={styles.padClass}>
                        <Link href={`/tv/${props.id}/seasons/${season.season_number}`}>
                            <Text p={5} size="xl" fw="bold">{season.name} | {season.episode_count} Episodes</Text>
                        </Link>
                        <Text p={10} component="p">{season.overview}</Text>
                    </div>
                </div>
            })}
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    try {
        const { data, error } = await client.query({
            query: SEASONS,
            variables: {
                getTvDetailsId: params && params.id
            }
        })

        if (error) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                title: data.getTvDetails.name,
                id: data.getTvDetails.id,
                season: data.getTvDetails.seasons
            }
        }
    } catch (error) {
        console.log(`error occured while fetching data about tv seasons`)
    }

    return {
        notFound: true
    }
}
import { gql } from "@apollo/client";
import { Text } from "@mantine/core";
import { Maybe } from "graphql/jsutils/Maybe";
import { GetServerSideProps } from "next/types";
import client from "../../../../../apollo-client";
import ImageCard from "../../../../../components/ImageCard";
import MoreTitle from "../../../../../components/MoreTitle";
import { GetDate } from "../../../../../lib/util";
import { SeasonEpisodes } from "../../../../../schemaTypes";
import styles from "../../../../../styles/season.module.css";
import EpisodeInfo from "../../../../../components/EpisodeInfo";
import Head from "next/head";

const EPISODES = gql`
query SeasonTvEpisodes($tvEpisodesId: ID!, $seasonNumber: Int!) {
  TvEpisodes(id: $tvEpisodesId, season_number: $seasonNumber) {
    episodes {
      name
      id
      overview
      air_date
      still_path
      episode_number
    }
    poster_path
    name
    air_date
    id
    season_number
  }
}
`

interface Props {
    episodes: any,
    tvId: number
}

export default function Episodes(props: Props) {
    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{props.episodes.name}</title>
        </Head>
        <MoreTitle backpath={`/tv/${props.tvId}/seasons`} id={props.tvId} sourceMedia="TV" title={props.episodes.name} />
        <div className={styles.wrapper}>
            {props.episodes.episodes.map((episode: any) => {
                return <div key={episode.id} className={styles.wrapper3}>
                    <div className={styles.wrapper2}>
                        <div className={styles.imageWrapper}>
                            <ImageCard height={100} width={200} w="w300" imgUrl={episode.still_path} />
                        </div>
                        <div className={styles.sideWrapper}>
                            <div className={styles.sideWrapper2}>
                                <Text fw="bold">{episode.episode_number}.{episode.name}</Text>
                                <Text>{GetDate(episode.air_date)}</Text>
                            </div>
                            <Text>{episode.overview}</Text>
                        </div>
                    </div>

                    <EpisodeInfo id={props.tvId} episode_number={parseInt(episode.episode_number)} season_number={parseInt(props.episodes.season_number)} />
                </div>
            })}
        </div>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && !params.id && !params.season_id) {
        return {
            notFound: true
        }
    }

    try {
        const { data, error, errors } = await client.query({
            query: EPISODES,
            variables: {
                tvEpisodesId: params && params.id ? params.id : null,
                seasonNumber: params && params.season_id ? parseInt(params.season_id as string) : null
            },
        })

        if (error) {
            console.log(`Errors while fetching season data in error if statement = ${errors}`);
            return {
                notFound: true
            }
        }

        return {
            props: {
                episodes: data.TvEpisodes,
                tvId: params && params.id
            }
        }
    } catch (error) {
        console.log(`Errors while fetching season data = ${error}`)
    }

    return {
        notFound: true
    }
}
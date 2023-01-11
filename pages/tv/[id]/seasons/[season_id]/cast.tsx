import { gql, useQuery } from "@apollo/client"
import { Text, Avatar, Title } from "@mantine/core"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "../../../../../styles/cast.module.css";
import Link from "next/link";

const CREDITS = gql` #graphql
query TvEpisodeDetail($tvEpisodeDetailId: ID!, $seasonNumber: Int!, $episodeNumber: Int!) {
  TvEpisodeDetail(id: $tvEpisodeDetailId, season_number: $seasonNumber, episode_number: $episodeNumber) {
    crew {
      job
      name
      department
      id
      profile_path
    }
    guest_stars {
      name
      character
      id
      profile_path
    }
    still_path
    crew_number
    name
    guest_stars_count
  }
}
`

interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV"
}

export default function CastSeason() {
    const router = useRouter();
    const { id, season_id, episode_number } = router.query;

    const { loading, error, data } = useQuery(CREDITS, {
        variables: {
            tvEpisodeDetailId: id,
            seasonNumber: parseInt(season_id as string),
            episodeNumber: parseInt(episode_number as string) | 0
        }
    })

    if (loading) {
        return <p>Loading....</p>
    }

    if (error) {
        return <p>{`${error}`}</p>
    }

    return <div className={styles.wrapper}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={`Cast of movie`} />
            <title>{data.TvEpisodeDetail.name} - Cast</title>
        </Head>
        <div>
            <Title size="h2" order={3} fw="bolder">Guest Stars</Title>
            <ul>
                {data && data.TvEpisodeDetail.guest_stars.map((ele: any, index: number) => {
                    return <li className={styles.list} key={ele.id * index * Math.random() * 22}>
                        <Avatar
                            src={ele.profile_path !== null ?
                                `https://image.tmdb.org/t/p/w200${ele.profile_path}` : null}
                            alt="profile image" size="lg" />
                        <div className={styles.textWrapper}>
                            <Link href={`/people/${ele.id}`}><Text variant="text" className={styles.text} fw="bold">{ele.name}</Text></Link>
                            <Text variant="text">{ele.character}</Text>
                        </div>
                    </li>
                })}
            </ul>
        </div>
        <div>
            <Title size="h2" order={3} fw="bolder">Crew</Title>
            <ul>
                {data && data.TvEpisodeDetail.crew.map((ele: any, index: number) => {
                    return <li className={styles.list} key={ele.id * index * Math.random() * 11}>
                        <Avatar
                            src={ele.profile_path !== null ?
                                `https://image.tmdb.org/t/p/w200${ele.profile_path}` : null}
                            alt="profile image" size="lg" />
                        <div className={styles.textWrapper}>
                            <Link href={`/people/${ele.id}`}><Text variant="text" className={styles.text} fw="bold">{ele.name}</Text></Link>
                            <Text variant="text">{ele.department}</Text>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    </div>
}
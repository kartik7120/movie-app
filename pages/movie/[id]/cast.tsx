import { gql, useQuery } from "@apollo/client"
import { Text, Avatar, Title } from "@mantine/core"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "../../../styles/cast.module.css";

const CREDITS = gql` #graphql
    query GetCast($getCastId: ID!, $mediaType: SourceMedia!) {
    getCast(id: $getCastId, mediaType: $mediaType) {
    cast {
      name
      profile_path
      character
      id
    }
    crew {
      name
      profile_path
      department
      id
    }
  }
}
`

interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV"
}

export default function Cast() {
    const router = useRouter();
    const { id } = router.query;

    const { loading, error, data } = useQuery(CREDITS, {
        variables: {
            getCastId: id,
            mediaType: 'MOVIE'
        }
    })

    if (loading) {
        return <p>Loading....</p>
    }

    if (error) {
        return <p>{`${error}`}</p>
    }


    return <div>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={`Cast of movie`} />
            <title></title>
        </Head>
        <Title size="h2" order={3} fw="bolder">Cast</Title>
        <ul>
            {data && data.getCast.cast.map((ele: any, index: number) => {
                return <li className={styles.list} key={ele.id * index * Math.random() * 22}>
                    <Avatar
                        src={ele.profile_path !== null ?
                            `https://image.tmdb.org/t/p/w200${ele.profile_path}` : null}
                        alt="profile image" size="lg" />
                    <Text variant="text" fw="bold">{ele.name}</Text>
                    <Text variant="text">{ele.character}</Text>
                </li>
            })}
        </ul>
        <Title size="h2" order={3} fw="bolder">Crew</Title>
        <ul>
            {data && data.getCast.crew.map((ele: any, index: number) => {
                return <li className={styles.list} key={ele.id * index * Math.random() * 11}>
                    <Avatar
                        src={ele.profile_path !== null ?
                            `https://image.tmdb.org/t/p/w200${ele.profile_path}` : null}
                        alt="profile image" size="lg" />
                    <Text variant="text" fw="bold">{ele.name}</Text>
                    <Text variant="text">{ele.department}</Text>
                </li>
            })}
        </ul>
    </div>
}
import { gql, useQuery } from "@apollo/client";
import { LoadingOverlay, Pagination, Title } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import CardComponent from "../../components/CardComponent";
import styles from "../../styles/side.module.css";

const NOW_PLAYING_MOVIES = gql` #graphql
query UpcomingMovies($page: Int) {
  upcomingMovies(page: $page) {
    nowPlaying {
      id
      original_title
      poster_path
      title
      release_date
    }
    total_pages
    page
  }
}
`

export default function UpcomingTv() {
    const [activePage, setPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(NOW_PLAYING_MOVIES, {
        variables: {
            page: activePage
        },
        onError(error) {
            console.log(error);
        },
        onCompleted(data) {
            console.log(data);
        },
    })

    if (error) {
        return <p>Error : {`${error}`}</p>
    }

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Upcoming Movies</title>
        </Head>
        <Title order={1} pl="lg" pt="lg">Upcoming Movies</Title>
        <div className={styles.wrapper2}>
            <div className={styles.wrapper}>
                {data ? data.upcomingMovies.nowPlaying.map((movie: any, index: number) => {
                    return <div key={movie.id} className={styles.cardWrapper}>
                        <CardComponent media_type="movie" id={movie.id} original_title={movie.title} poster_path={movie.poster_path} />
                    </div>
                }) : <LoadingOverlay visible={loading} />}
            </div>
            {data && <Pagination style={{ margin: "0 auto" }}
                color="yellow" total={data.upcomingMovies.total_pages} onChange={(page => {
                    refetch({
                        page
                    })
                    setPage(page);
                })} page={activePage} />
            }
        </div>
    </>

}
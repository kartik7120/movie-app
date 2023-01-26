import { gql, useQuery } from "@apollo/client";
import { LoadingOverlay, Pagination, Title } from "@mantine/core";
import { useState } from "react";
import CardComponent from "../../components/CardComponent";
import styles from "../../styles/side.module.css";
import Head from "next/head";

const NOW_PLAYING_TV = gql`
    query NowPlayingTv($page: Int) {
  nowPlayingTv(page: $page) {
    results {
      id
      name
      poster_path
    }
    page
    total_pages
  }
}
`

export default function PlayingNowTv() {
    const [activePage, setPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(NOW_PLAYING_TV, {
        variables: {
            page: activePage
        },
        onError(error) {
            console.log(error);
        },
    })

    if (error) {
        return <p>Error : {`${error}`}</p>
    }

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Now Playing Shows</title>
        </Head>
        <Title order={1} pl="lg" pt="lg">Now Playing Shows</Title>
        <div className={styles.wrapper2}>
            <div className={styles.wrapper}>
                {data ? data.nowPlayingTv.results.map((movie: any, index: number) => {
                    return <div key={movie.id} className={styles.cardWrapper}>
                        <CardComponent media_type="tv" id={movie.id} original_title={movie.name} poster_path={movie.poster_path} />
                    </div>
                }) : <LoadingOverlay visible={loading} />}
            </div>
            {data && <Pagination style={{ margin: "0 auto" }}
                color="yellow" total={data.nowPlayingTv.total_pages} onChange={(page => {
                    refetch({
                        page
                    })
                    setPage(page);
                })} page={activePage} />
            }
        </div>
    </>

}
import { gql, useQuery } from "@apollo/client";
import { Center, LoadingOverlay, Pagination, Title } from "@mantine/core";
import { useState } from "react";
import CardComponent from "../../components/CardComponent";
import { NowPopularComplete } from "../../schemaTypes";
import styles from "../../styles/side.module.css";
import Head from "next/head";

const NOW_PLAYING = gql`
query GetPopularMovies($page: Int) {
  getPopularMovies(page: $page) {
    page
    results {
      id
      original_title
      poster_path
      title
      release_date
    }
    total_pages
  }
}
`

export default function MostPopular() {
  const [activePage, setPage] = useState(1);

  const { data, loading, error, refetch } = useQuery(NOW_PLAYING, {
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
      <title>Popular Movies</title>
    </Head>
    <Title order={1} pl="lg" pt="lg">Popular Movies</Title>
    <div className={styles.wrapper2}>
      <div className={styles.wrapper}>
        {data ? data.getPopularMovies.results.map((movie: any, index: number) => {
          return <div key={movie.id} className={styles.cardWrapper}>
            <CardComponent media_type="movie" id={movie.id} original_title={movie.title} poster_path={movie.poster_path} />
          </div>
        }) : <LoadingOverlay visible={loading} />}
      </div>
      {data && <Pagination style={{ margin: "0 auto" }}
        color="yellow" total={data.getPopularMovies.total_pages} onChange={(page => {
          refetch({
            page
          })
          setPage(page);
        })} page={activePage} />
      }
    </div>
  </>
}
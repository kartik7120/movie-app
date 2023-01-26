import { gql, useQuery } from "@apollo/client";
import { LoadingOverlay, Pagination, Title } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import CardComponent from "../../components/CardComponent";
import styles from "../../styles/side.module.css";

const POPUPLAR_PEOPLE = gql` #graphql
query GetPopularPeople($page: Int) {
  getPopularPeople(page: $page) {
    page
    total_pages
    results {
      name
      id
      profile_path
    }
  }
}
`

export default function UpcomingTv() {
    const [activePage, setPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(POPUPLAR_PEOPLE, {
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
            <title>Popular Actors</title>
        </Head>
        <Title order={1} pl="lg" pt="lg">Popular Actors</Title>
        <div className={styles.wrapper2}>
            <div className={styles.wrapper}>
                {data ? data.getPopularPeople.results.map((movie: any, index: number) => {
                    return <div key={movie.id} className={styles.cardWrapper}>
                        <CardComponent media_type="people" id={movie.id} original_title={movie.name} poster_path={movie.profile_path} />
                    </div>
                }) : <LoadingOverlay visible={loading} />}
            </div>
            {data && <Pagination style={{ margin: "0 auto" }}
                color="yellow" total={data.getPopularPeople.total_pages} onChange={(page => {
                    refetch({
                        page
                    })
                    setPage(page);
                })} page={activePage} />
            }
        </div>
    </>

}
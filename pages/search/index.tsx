import { gql } from "@apollo/client";
import { Card, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import ImageCard from "../../components/ImageCard";
import SearchLayout from "../../components/SearchLayout";
import { SearchResult } from "../../schemaTypes";
import type { NextPageWithLayout } from '../_app';
import styles from "../../styles/search.module.css";
import Link from "next/link";

const SEARCH = gql`
    query Search($query: String!, $page: Int) {
  Search(query: $query, page: $page) {
    page
    results {
      ... on NowPlaying {
        title
        id
        media_type
        poster_path
      }
      ... on NowPlayingTv {
        media_type
        id
        showname
        original_string
        poster_path
      }
      ... on People {
        id
        media_type
        name
        profile_path
      }
    }
    total_pages
  }
}
`

interface Props {
    data: SearchResult[],
    page: number,
    total_pages: number,
}

const Search: NextPageWithLayout<Props> = (props: Props) => {
    return <>
        {props.data.map((result, index: number) => {
            return <div className={styles.wrapper} key={Math.random() * parseInt(result.id)}>
                <div>
                    <Link href={`/${result.media_type}/${result.id}`}>
                        <ImageCard w="w200" width={100} height={150}
                            imgUrl={result.__typename === "NowPlaying" || result.__typename === "NowPlayingTv" ?
                                result.poster_path : result.__typename === "People" ? result.profile_path : null} />
                    </Link>
                </div>
                <div className={styles.wrapper2}>
                    <Link href={`/${result.media_type}/${result.id}`}>
                        <Text variant="text" fw="bold">
                            {result.__typename === "NowPlaying" ?
                                result.title : result.__typename === "NowPlayingTv" ?
                                    result.showname : result.__typename === "People" ? result.name : ""}
                        </Text>
                    </Link>
                    <Text variant="text">
                        {result.__typename === "NowPlaying" ?
                            result.overview : result.__typename === "NowPlayingTv" ?
                                result.overview : ""}
                    </Text>
                </div>
            </div>
        })}
    </>
}

Search.getLayout = function getLayout(page: React.ReactElement) {
    return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    if (query && query.query === "") {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: SEARCH,
        variables: {
            query: query.query || "",
            page: query.page || null
        }
    })

    if (error) {
        return {
            notFound: true
        }
    }

    // console.log(`data returned = ${JSON.stringify(data)}`);

    return {
        props: {
            data: data.Search.results,
            total_pages: data.Search.total_pages,
            page: data.Search.page
        }
    }
}

export default Search;
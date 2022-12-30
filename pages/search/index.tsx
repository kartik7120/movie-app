import { ApolloError, gql } from "@apollo/client";
import { Card, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import ImageCard from "../../components/ImageCard";
import SearchLayout from "../../components/SearchLayout";
import { SearchResult } from "../../schemaTypes";
import type { NextPageWithLayout } from '../_app';
import styles from "../../styles/search.module.css";
import Link from "next/link";
import { Pagination } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";

const SEARCH = gql`
    query Search($query: String!, $page: String) {
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
// ${page ? `&page=${page}` : ""}
const Search: NextPageWithLayout<Props> = (props: Props) => {

    const router = useRouter();
    const [page, setPage] = React.useState(props.page);

    function handleChange(pag: number) {
        router.push(`/search?query=${router.query.query}&page=${pag}`);
        setPage(pag);
    }

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
        <Pagination total={props.total_pages} page={page} onChange={handleChange} position="center" />
    </>
}

Search.getLayout = function getLayout(page: React.ReactElement) {
    return <SearchLayout>{page}</SearchLayout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
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
                page: query.page
            }
        })

        if (error) {
            return {
                notFound: true
            }
        }
        return {
            props: {
                data: data.Search.results,
                total_pages: data.Search.total_pages,
                page: data.Search.page
            }
        }
    } catch (e: any) {
        console.log(e.networkError.result.errors)
    }

    return {
        notFound: true
    }
}

export default Search;
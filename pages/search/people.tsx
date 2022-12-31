import { gql } from "@apollo/client";
import { Avatar, Pagination, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";
import { SearchResult, PeopleResult, People } from "../../schemaTypes";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SearchLayout from "../../components/SearchLayout";
import styles from "../../styles/Searchpeople.module.css";

const PEOPLE_RESULTS = gql`
    query SearchPeople($query: String!, $page: Int) {
  searchPeople(query: $query, page: $page) {
    total_pages
    result {
      id
      media_type
      name
      profile_path
    }
    page
  }
}
`
interface Props {
    data: People[],
    page: number,
    total_pages: number,
}

export default function SearchPeople(props: Props) {

    const router = useRouter();
    const [page, setPage] = React.useState(props.page);

    function handleChange(pag: number) {
        router.push(`/search/people?query=${router.query.query}&page=${pag}`);
        setPage(pag);
    }

    return <> <ul>
        {props.data.map((ele) => {
            return <li key={ele.id} className={styles.wrapper}>
                <Avatar
                    src={ele.profile_path !== null ?
                        `https://image.tmdb.org/t/p/w200${ele.profile_path}` : null}
                    alt="profile image" size="lg" />
                <Link href={`/people/${ele.id}`}><Text pl="sm" variant="text" fw="bold">{ele.name}</Text></Link>
            </li>
        })}
    </ul>
        <Pagination total={props.total_pages} page={page} onChange={handleChange} position="center" />
    </>
}

SearchPeople.getLayout = function getLayout(page: React.ReactElement) {
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

        if (query && query.page) {
            if (typeof query.page === "string" && isNaN(parseInt(query.page))) {
                return {
                    notFound: true
                }
            }
        }

        const { data, error } = await client.query({
            query: PEOPLE_RESULTS,
            variables: {
                query: query.query || "",
                page: typeof query.page === "string" ? parseInt(query.page) : 1,
            }
        })

        if (error) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                data: data.searchPeople.result,
                total_pages: data.searchPeople.total_pages,
                page: data.searchPeople.page
            }
        }
    } catch (e: any) {
        console.log(e.networkError.result.errors)
    }

    return {
        notFound: true
    }
}
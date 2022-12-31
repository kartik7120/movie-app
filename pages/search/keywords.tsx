import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import client from "../../apollo-client";
import SearchLayout from "../../components/SearchLayout";
import { Keyword } from "../../schemaTypes";

const KEYWORDS_RESULTS = gql`
    query SearchKeywords($query: String!, $page: Int) {
  SearchKeywords(query: $query, page: $page) {
    page
    results {
      id
      name
    }
    total_pages
  }
}
`

interface Props {
    data: Keyword[],
    page: number,
    total_pages: number,
}


export default function KeywordSearch(props: Props) {
    return <ul>
        {props.data.map((keyword) => {
            return <Link key={keyword.id} href={`/search?query=${keyword.name}`}><li >{keyword.name}</li></Link>
        })}
    </ul>
}

KeywordSearch.getLayout = function getLayout(page: React.ReactElement) {
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
            query: KEYWORDS_RESULTS,
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
                data: data.SearchKeywords.results,
                total_pages: data.SearchKeywords.total_pages,
                page: data.SearchKeywords.page
            }
        }
    } catch (e: any) {
        console.log(e.networkError.result.errors)
    }

    return {
        notFound: true
    }
}
import { gql } from "@apollo/client";
import { GetServerSideProps } from "next/types";
import client from "../../../apollo-client";
import MoreTitle from "../../../components/MoreTitle";
import { Season } from "../../../schemaTypes";

const SEASONS = gql`
    query GetTvDetails($getTvDetailsId: ID!) {
    getTvDetails(id: $getTvDetailsId) {
    id
    name
    seasons {
      name
      poster_path
      season_number
      episode_count
      air_date
      overview
    }
  }
}
`

interface Props {
    season: Season[],
    title: string,
    id: number
}

export default function Seasons(props: Props) {
    return <>
        <MoreTitle id={props.id} title={props.title || "Title"} sourceMedia="TV" />
        
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    try {
        const { data, error } = await client.query({
            query: SEASONS,
            variables: {
                getTvDetailsId: params && params.id
            }
        })

        if (error) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                title: data.getTvDetails.name,
                id: data.getTvDetails.id,
                seasons: data.getTvDetails.seasons
            }
        }
    } catch (error) {
        console.log(`error occured while fetching data about tv seasons`)
    }

    return {
        notFound: true
    }
}
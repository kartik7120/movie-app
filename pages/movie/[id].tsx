import { gql } from "apollo-server-micro";
import { GetServerSideProps } from "next";
import client from "../../apollo-client";

type data = {
    name: string
}
const MOVIE_DETAILS = gql`
    query GetTvDetails($getTvDetailsId: ID!) {
    getTvDetails(id: $getTvDetailsId) {
      name
      homepage
      number_of_episodes
      number_of_seasons
      original_name
      status
      type
      overview
      episode_run_time
      backdrop_path
  }
}
`

export default function Media() {
    return <h1>I will render the details for a single movie</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;

    if (params && !params.id) {
        return {
            notFound: true
        }
    }

    const result = await client.query({
        query: MOVIE_DETAILS,
        variables: {
            getTvDetailsId: params ? params.id : null
        }
    })

    return {
        props: {
            data: result.data.getTvDetails,
            id: params ? params.id : null
        },
    }
}

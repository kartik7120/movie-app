import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import client from "../../../apollo-client";
import { PeopleDetails } from "../../../schemaTypes";
const PEOPLE_DETAILS = gql`
    query PeopleDetails($peopleDetailsId: ID!) {
    peopleDetails(id: $peopleDetailsId) {
    biography
    also_known_as
    birthday
    deathday
    gender
    imdb_id
    name
    place_of_birth
    profile_path
    homepage
  }
}
`

interface Props {
    people: PeopleDetails
}

export default function People(props: PeopleDetails): JSX.Element {

    return <>
        <h1>I will render people&apos;s information</h1>
    </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;

    if (params && (params.id === undefined || params.id === null)) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: PEOPLE_DETAILS,
        variables: {
            peopleDetailsId: params && params.id ? params.id : null
        }
    })

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            people: data.peopleDetails
        }
    }
}
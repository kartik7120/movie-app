import { gql } from "@apollo/client";
import { GetServerSideProps } from "next"
import client from "../../../apollo-client";
import { PeopleDetails } from "../../../schemaTypes";
import Head from "next/head";
import ImageCard from "../../../components/ImageCard";
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

export default function People(props: Props): JSX.Element {

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <title>{props.people.name}</title>
        </Head>
        <div>
            <div>
                <ImageCard width={300} height={500} imgUrl={props.people.profile_path!} />
            </div>
            <div>
                Second Section
            </div>
        </div>
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
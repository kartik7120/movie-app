import { Badge } from "@mantine/core";
import { gql, useQuery } from "@apollo/client";
import styles from "../styles/movie.module.css";

const KEYWORDS = gql`
    query GetKeywords($getKeywordsId: ID!, $mediaType: SourceMedia!) {
    getKeywords(id: $getKeywordsId, mediaType: $mediaType) {
    keywords {
      name
      id
    }
  }
}
`
interface Props {
    id: number,
    sourceMedia: "MOVIE" | "TV"
}

export default function Keywords(props: Props): JSX.Element {

    const { loading, error, data } = useQuery(KEYWORDS, {
        variables: {
            getKeywordsId: props.id,
            mediaType: props.sourceMedia
        }
    })

    if (loading) {
        return <p>Loading...</p>
    }

    return <div className={styles.keywords}>
        <ul>
            {data && data.getKeywords.keywords.map((keyword: any) => {
                return <Badge component="li" size="lg" variant="filled" key={keyword.id}>
                    {keyword.name}
                </Badge>
            })}
        </ul>
    </div>

}
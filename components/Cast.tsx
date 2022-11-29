import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "@apollo/client";

const CAST = gql`
query GetCast($getCastId: ID!, $mediaType: SourceMedia!, $first: Int) {
  getCast(id: $getCastId, mediaType: $mediaType, first: $first) {
    cast {
      name
      character
      id
      profile_path
    }
  }
}
`

export default function Cast(): JSX.Element {
    
    return <Carousel>

    </Carousel>
}
import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "@apollo/client";
import ImageCard from "./ImageCard";
import { Text } from "@mantine/core";

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

interface Props {
  id: number
  mediaType: string
  first?: number
}

export default function Cast(props: Props): JSX.Element {

  const { loading, error, data } = useQuery(CAST, {
    variables: {
      getCastId: props.id,
      mediaType: props.mediaType,
      first: props.first
    },
    fetchPolicy: "cache-and-network"
  })

  if (loading) {
    return <p>Loading</p>
  }


  return <Carousel slideSize="5%" height={200} slideGap="md" dragFree>
    {data && data.getCast.cast.map((ele: any, index: number) => {
      return <Carousel.Slide key={Math.random() * index * 41}>
        <ImageCard imgUrl={ele.profile_path} width={150} height={200} title={`${ele.name} image`} />
        <Text size="md" variant="text" >{ele.name}</Text>
        <Text size="sm" variant="text" >{ele.character}</Text>
      </Carousel.Slide>
    })}
  </Carousel>
}
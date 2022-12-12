import { useQuery } from "@apollo/client";
import { Carousel } from "@mantine/carousel";
import { gql } from "@apollo/client";
import ImageCard from "./ImageCard";
import { Button, Text, Title } from "@mantine/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";

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


  return <>
    <Carousel slideSize="10%" align="start" height={300} slideGap="sm" dragFree>
      {data && data.getCast.cast.map((ele: any, index: number) => {
        return <Link href={`/people/${ele.id}`} key={Math.random() * index * 41}>
          <Carousel.Slide >
            <ImageCard imgUrl={ele.profile_path} width={150} height={200} title={`${ele.name} image`} />
            <Text fw="bold" size="md" variant="text" >{ele.name}</Text>
            <Text size="sm" variant="text" >{ele.character}</Text>
          </Carousel.Slide>
        </Link>
      })}
      <Carousel.Slide style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button type="button" size="sm" component="a" href="#" rightIcon={<AiOutlineArrowRight />}>
          View more
        </Button>
      </Carousel.Slide>
    </Carousel>
    <Button type="button" variant="outline" size="sm" component="a" href={`/movie/${props.id}/cast`}>
      Full cast and Crew
    </Button>
  </>
}
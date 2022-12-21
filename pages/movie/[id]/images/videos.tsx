import { useMediaQuery } from "@mantine/hooks";
import Head from "next/head";
import LeftOptions from "../../../../components/LeftOptions";
import MoreTitle from "../../../../components/MoreTitle";
import PosterCard from "../../../../components/PosterCard";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { AiOutlineArrowRight, AiOutlinePlayCircle } from "react-icons/ai";
import ReactPlayer from "react-player/youtube";
import styles from "../../../../styles/movie.module.css";
import { ActionIcon, Portal, Card, Modal, ScrollArea, Text } from "@mantine/core";
import Link from "next/link";
import { GetServerSideProps } from "next";
import client from "../../../../apollo-client";
import React from "react";
import videoStyles from "../../../../styles/videos.module.css";
import { BsFillPlayCircleFill } from "react-icons/bs";

const VIDEOS = gql`
    query GetVideoMedia(
  $getVideoMediaId: ID!
  $sourceMedia: SourceMedia!
  $includeType: String
) {
  getVideoMedia(
    id: $getVideoMediaId
    sourceMedia: $sourceMedia
    include_type: $includeType
  ) {
    ... on SpecificMedia {
      typeMedia
      mediaMap {
        key
        value {
          type
          id
          name
          key
          site
        }
      }
    }
    ... on videoMedia {
      mediaVideo {
        type
        id
        name
        key
      }
      typeMap
    }
  }
  getMovieDetails(id:$getVideoMediaId) {
    title
    id
  }
}
`

interface Props {
    data: any[],
    typeMedia: string[],
    title: string,
    id: number
}

export default function Videos(props: Props) {
    const matches = useMediaQuery('(max-width:530px)');
    const isMobile = useMediaQuery('(max-width: 650px)');
    const matches1 = useMediaQuery('(max-width:1210px)');
    const matches2 = useMediaQuery("(max-width:1012px)");
    const matches3 = useMediaQuery("(max-width:1097px)");
    const matches4 = useMediaQuery("(max-width:492px)");

    const [opened, setOpened] = React.useState(false);
    const [url, setUrl] = React.useState<string | undefined>(undefined);

    return <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <title>{props.title} - Videos</title>
        </Head>

        <MoreTitle id={props.id} title={`${props.title || "Movie Title"}`} />
        <div className={styles.wrapper}>
            <div className={styles.wrapper3}>
                <LeftOptions type="videos" id={props.id} title="Videos" videoList={props.typeMedia} />
            </div>
            <div className={styles.wrapper2}>
                <Modal size="auto" fullScreen={isMobile} closeOnClickOutside={false} centered opened={opened} onClose={() => {
                    setOpened(false);
                    setUrl(undefined);
                }}>
                    <ReactPlayer playing stopOnUnmount width={isMobile ? 500 : matches3 ? undefined : 1000}
                        height={isMobile ? 300 : matches3 ? undefined : 500}
                        controls={true} url={url} />
                </Modal>
                {props.data.map((ele: { key: string, value: any[] }, index: number) => {
                    return <div key={Math.random() * index * 7} className={videoStyles.wrapper3}>
                        {ele.value.map((ele, index: number) => {
                            return <Card key={Math.random() * index * 69} w={matches2 ? undefined : matches1 ? 800 : 1000} m={10} radius="lg">
                                <div className={videoStyles.wrapper}>
                                    <div>
                                        <div className={videoStyles.playerWrapper}>
                                            <ReactPlayer light={true} width={matches ? 300 : 400}
                                                height={matches ? 150 : 200} previewTabIndex={1}
                                                controls={false} url={`https://www.youtube.com/watch?v=${ele.key}`} />
                                            <div className={videoStyles.playerOverley}>
                                                <ActionIcon size="xl"
                                                    opacity={1} onClick={() => {
                                                        if (matches === false) {
                                                            setUrl(`https://www.youtube.com/watch?v=${ele.key}`);
                                                            setOpened(true);
                                                        }
                                                    }}>
                                                    {matches ? <Link target="_blank" href={`https://www.youtube.com/watch?v=${ele.key}`}>
                                                        <BsFillPlayCircleFill color="black" size={50} />
                                                    </Link> :
                                                        <BsFillPlayCircleFill color="black" size={50} />}
                                                </ActionIcon>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={videoStyles.wrapper2}>
                                        <Text variant="text" fw="bold" size="lg">{ele.name}</Text>
                                        <Text variant="text" fw="bold" size="lg">{ele.site}</Text>
                                    </div>
                                </div>
                            </Card>
                        })}
                    </div>
                })}
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

    if (query.includeType === null || query.includeType === undefined) {
        return {
            notFound: true
        }
    }

    const { data, error } = await client.query({
        query: VIDEOS,
        variables: {
            getVideoMediaId: params ? params.id : null,
            sourceMedia: "MOVIE",
            includeType: query.includeType ? query.includeType : null
        },
        fetchPolicy: "cache-first",
    });

    if (data.getVideoMedia.typeMedia.includes(query.includeType) === false) {
        return {
            notFound: true
        }
    }

    if (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            typeMedia: data.getVideoMedia.typeMedia,
            data: data.getVideoMedia.mediaMap,
            title: data.getMovieDetails.title,
            id: data.getMovieDetails.id
        }
    }

}
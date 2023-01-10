import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { Button, Collapse, Text } from '@mantine/core';
import React from "react";
import styles from "../styles/episode.module.css";
import { EpisodeDetail } from "../schemaTypes";
import { filterName } from "../lib/util";

const EPISODE_DETAIL = gql`
    query TvEpisodeDetail($tvEpisodeDetailId: ID!, $seasonNumber: Int!, $episodeNumber: Int!) {
  TvEpisodeDetail(id: $tvEpisodeDetailId, season_number: $seasonNumber, episode_number: $episodeNumber) {
    crew {
      job
      name
    }
    guest_stars {
      name
      character
    }
    still_path
    crew_number
    guest_stars_count
  }
}
`

interface Props {
  id: number,
  season_number: number,
  episode_number: number
}

export default function EpisodeInfo(props: Props): JSX.Element {
  const [opened, setOpened] = React.useState(false);

  const [getData, { loading, error, data }] = useLazyQuery(EPISODE_DETAIL, {
    variables: {
      tvEpisodeDetailId: props.id,
      seasonNumber: props.season_number,
      episodeNumber: props.episode_number
    },
    onCompleted(data) {
      console.log(data);
    },
  });

  if (error) {
    console.log(`error = ${error}`)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return <div className={styles.wrapper}>
    <Button onClick={() => {
      setOpened((o) => !o);
      getData();
    }}>
      {!opened ? "Show More" : "Hide"}
    </Button>

    <Collapse in={opened}>
      <div className={styles.wrapper3}>
        <div className={styles.wrapper2}>
          <Text variant="text" fw="bold">Crew {data && data.TvEpisodeDetail.crew_number}</Text>
          <Text variant="text">Directed By: {data && filterName(data.TvEpisodeDetail.crew, "Director").map((ele) => `${ele},`)}</Text>
          <Text variant="text">Written By: {data && filterName(data.TvEpisodeDetail.crew, "Writer").map((ele) => `${ele},`)}</Text>
        </div>
        <Text variant="text" fw="bold">Guest Stars {data && data.TvEpisodeDetail.guest_stars_count}</Text>
      </div>
    </Collapse>
  </div>
}
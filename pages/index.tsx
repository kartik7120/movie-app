import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button, SegmentedControl, Text, Title } from "@mantine/core";
import Link from 'next/link';
import carosel from "../styles/carosel.module.css";
import React from 'react';
import PopularMovies from '../components/PopularMovies';
import PopularTv from '../components/PopularTv';
import NowPlayingMovies from '../components/NowPlayingMovies';
import NowPlayingTv from '../components/NowPlayingTv';
import CaroselHeading from "../components/CaroselHeadingWrapper";
import TrendingComponent from "../components/Trending";

type MediaType = "movie" | "tv";
type Trending = "DAY" | "WEEK";

export default function Home() {

  const [value, setValue] = React.useState<MediaType | undefined>('movie');
  const [state, setState] = React.useState<MediaType | undefined>('movie');
  const [trending, setTrending] = React.useState<Trending | undefined>('DAY');

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Millions of movies, TV shows and people to discover. Explore now." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.upper}>
          <Title size="h1" order={2}>Welcome</Title>
          <Title size="h2" order={2}>Millions of movies, TV shows and people to discover. Explore now.</Title>
        </div>
        <div className={carosel.wrapper}>
          <CaroselHeading heading="What's Popular">
            <SegmentedControl
              value={value}
              onChange={(value: MediaType) => {
                setValue(value)
              }}
              data={[
                { label: "In Theaters", value: "movie" },
                { label: "On Tv", value: "tv" }
              ]} size="md" color="yellow" />
          </CaroselHeading>
          {value === "movie" ? <PopularMovies /> : <PopularTv />}
        </div>
        <div className={carosel.wrapper}>
          <CaroselHeading heading='Now Playing'>
            <SegmentedControl
              value={state}
              onChange={(value: MediaType) => {
                setState(value)
              }}
              data={[
                { label: "In Theaters", value: "movie" },
                { label: "On Tv", value: "tv" }
              ]} size="md" color="yellow" />
          </CaroselHeading>
          {state === "movie" ? <NowPlayingMovies /> : <NowPlayingTv />}
        </div>
        <div className={carosel.wrapper}>
          <CaroselHeading heading='Trending'>
            <SegmentedControl
              value={trending}
              onChange={(value: Trending) => {
                setTrending(value)
              }}
              data={[
                { label: "Today", value: "DAY" },
                { label: "This Week", value: "WEEK" }
              ]} size="md" color="yellow" />
          </CaroselHeading>
          {trending === "DAY" ? <TrendingComponent key={Math.random() * 12} timeWindow={trending} />
            : <TrendingComponent key={Math.random() * 71} timeWindow={trending!} />}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

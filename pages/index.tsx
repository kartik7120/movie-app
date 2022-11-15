import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button, Group, SegmentedControl, Title } from "@mantine/core";
import Link from 'next/link';
import carosel from "../styles/carosel.module.css";
import React from 'react';
import PopularMovies from '../components/PopularMovies';
import PopularTv from '../components/PopularTv';

type MediaType = "movie" | "tv";

export default function Home() {

  const [value, setValue] = React.useState<MediaType | undefined>('movie');

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={carosel.wrapper}>
          <Group align="start" position='left'>
            <Title order={1} weight={500} align="center" size={30}>
              What&#39;s Popular
            </Title>
            <SegmentedControl
              value={value}
              onChange={(value: MediaType) => {
                setValue(value)
              }}
              data={[
                { label: "In Theaters", value: "movie" },
                { label: "On Tv", value: "tv" }
              ]} size="md" color="yellow" />
          </Group>
          {value === "movie" ? <PopularMovies /> : <PopularTv />}
        </div>
        <Link href="/api/graphql" passHref legacyBehavior>
          <Button component='a'>GraphQL</Button>
        </Link>
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

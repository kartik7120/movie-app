import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button } from "@mantine/core";
import Link from 'next/link';
import { Carousel } from '@mantine/carousel';
import { useQuery, gql } from '@apollo/client';
import CardComponent from '../components/CardComponent';
import carosel from "../styles/carosel.module.css";
import { SegmentedControl } from '@mantine/core';

const NOW_PLAYING = gql`
  query nowPlaying {
    getPopularMovies {
    # id
    original_title
    # vote_count
    # vote_average
    poster_path
    # adult
    # title
    # release_date
  }
}
`

export default function Home() {

  const { loading, data, error } = useQuery(NOW_PLAYING);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={carosel.wrapper}>
          <Carousel breakpoints={[
            { maxWidth: 'md', slideSize: '25%' },
            { maxWidth: 'sm', slideSize: '50%', slideGap: 0 },
            { maxWidth: "xs", slideSize: "75%", slideGap: 0 }
          ]}
            sx={{ flex: 1 }} slidesToScroll={1} align="start" dragFree={true} withControls slideSize="20%">
            {data ? data.getPopularMovies.map((movie: any, index: number) => (
              <Carousel.Slide key={Math.random() * index * 45}>
                <CardComponent original_title={movie.original_title} poster_path={movie.poster_path} />
              </Carousel.Slide>
            )) : <Carousel.Slide>2</Carousel.Slide>
            }
          </Carousel>
        </div>
        <SegmentedControl data={[
          { label: "In Theaters", value: "movie" },
          { label: "On Tv", value: "tv" }
        ]} size="md" color="yellow" />
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

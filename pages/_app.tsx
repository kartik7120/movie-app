import '../styles/globals.css'
import React from "react";
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Navbar from '../components/Navbar';
import { NextPage } from 'next';
// import { rtlCache } from '../rtl-cache';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}



function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page);

  return <ApolloProvider client={client}> <div dir="ltr">
    <MantineProvider
      theme={{ colorScheme: "dark", dir: "ltr" }}
      withGlobalStyles
      withNormalizeCSS
    // emotionCache={rtlCache}
    >
      <Navbar />
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  </div>
  </ApolloProvider>
}

export default MyApp;

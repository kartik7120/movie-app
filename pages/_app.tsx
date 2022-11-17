import '../styles/globals.css'
import React from "react";
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Navbar from '../components/Navbar';
// import { rtlCache } from '../rtl-cache';


function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}> <div dir="ltr">
    <MantineProvider
      theme={{ colorScheme: "dark", dir: "ltr" }}
      withGlobalStyles
      withNormalizeCSS
    // emotionCache={rtlCache}
    >
      <Navbar />
      <Component {...pageProps} />
    </MantineProvider>
  </div>
  </ApolloProvider>
}

export default MyApp;

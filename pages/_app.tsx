import '../styles/globals.css'
import React from "react";
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Navbar from '../components/Navbar';
// import { rtlCache } from '../rtl-cache';


function MyApp({ Component, pageProps }: AppProps) {
  return <div dir="ltr">
    <MantineProvider
      theme={{ colorScheme: "dark", dir: "ltr" }}
      withGlobalStyles
      withNormalizeCSS
    // emotionCache={rtlCache}
    >
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </MantineProvider>
  </div>

}

export default MyApp;

import '../styles/globals.css'
import React, { useState } from "react";
import { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
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
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  const getLayout = Component.getLayout || ((page) => page);

  return <ApolloProvider client={client}> <div dir="ltr">
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      // emotionCache={rtlCache}
      >
        <Navbar />
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </ColorSchemeProvider>
  </div>
  </ApolloProvider>
}

export default MyApp;

import '../styles/globals.css'
import React from "react";
import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
// import { rtlCache } from '../rtl-cache';


function MyApp({ Component, pageProps }: AppProps) {
  return <div dir="ltr">
    <MantineProvider
      theme={{ colorScheme: "dark", dir: "ltr" }}
      withGlobalStyles
      withNormalizeCSS
      // emotionCache={rtlCache}
    >
      <Component {...pageProps} />
    </MantineProvider>
  </div>

}

export default MyApp;

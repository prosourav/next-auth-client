import { SessionProvider } from "next-auth/react"
import Head from "next/head"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} >
       <Head>
          <link rel='preconnect' href='//fonts.gstatic.com' crossOrigin />
          <link href='https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700;1,900&display=swap' rel='stylesheet' />
        </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}



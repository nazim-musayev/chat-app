import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "src/components/layout";
import client from "src/apollo/client";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, router, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <RecoilRoot>
          <AnimatePresence exitBeforeEnter>
            <Layout>
              <Component {...pageProps} key={`${router.asPath}`} />
            </Layout>
          </AnimatePresence>
        </RecoilRoot>
      </ApolloProvider>
    </SessionProvider>
  );
};

export default MyApp;

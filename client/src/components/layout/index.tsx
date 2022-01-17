import Head from "next/head";
import Login from "src/components/login";
import Loading from "src/components/shared/Loading";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <meta name="description" content="Lorem Ipsum is simply dummy text of the printing and typesetting industry" />
        <meta charSet="utf-8" />
        <title>Chat App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "loading" && (
        <>
          <Loading />
        </>
      )}
      {!session && status === "unauthenticated" && <Login />}
      {session && status === "authenticated" && (
        <main className="bg-primary h-screen py-14 px-32">
          {children}
        </main>
      )}
    </>
  );
};

export default Layout;

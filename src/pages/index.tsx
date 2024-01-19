import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import Layout from "@/layouts";
import Link from "next/link";

const HomePage: NextPageWithLayout = () => {

  return (
    <>
    <Head>
      <title>{"Placeholder App"}</title>
    </Head>
    <div>
      <Link passHref href={'/post'}>{"Start"}</Link>
    </div>
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return (<Layout>{page}</Layout>)
}

export default HomePage
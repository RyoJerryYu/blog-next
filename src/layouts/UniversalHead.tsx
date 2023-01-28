import Head from "next/head";

const UniversalHead = () => {
  return (
    <Head>
      <title>Ryo Blog</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Ryo's blog, build with next.js" />
      <link rel="icon" href="/img/favicon.ico" />
    </Head>
  );
};

export default UniversalHead;

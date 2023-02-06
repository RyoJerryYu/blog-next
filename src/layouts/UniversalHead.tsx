import Head from "next/head";

const DEFAULT_TITLE = "Ryo's Blog";

export const Title = ({
  children,
  force,
}: {
  children: string;
  force?: boolean;
}) => {
  const fullTitle = force ? children : `${children} | ${DEFAULT_TITLE}`;
  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta key="twitter:title" name="twitter:title" content={fullTitle} />
    </Head>
  );
};

export const Description = ({ children }: { children: string }) => {
  const fullDescription = children;
  return (
    <Head>
      <meta key="description" name="description" content={fullDescription} />
      <meta
        key="og:description"
        property="og:description"
        content={fullDescription}
      />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={fullDescription}
      />
    </Head>
  );
};

const UniversalHead = () => {
  return (
    <>
      <Title force>{DEFAULT_TITLE}</Title>
      <Description>{"Ryo's blog, build with next.js"}</Description>
      <Head>
        {/* og:site, og:image, og:url */}
        {/* og:type? twitter:card? */}
        {/* Facebook Open Graph: https://developers.facebook.com/docs/sharing/webmasters#markup */}
        {/* Twitter Card: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards */}
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
    </>
  );
};

export default UniversalHead;

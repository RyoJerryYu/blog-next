import Head from "next/head";
import { useRouter } from "next/router";

const SITE_NAME = "Ryo's Blog";
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://blog.ryojerryyu.xyz";
const BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";
const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

export const Title = ({
  children,
  force,
}: {
  children: string;
  force?: boolean;
}) => {
  const title = children ?? SITE_NAME;
  const fullTitle = force ? children : `${children} | ${SITE_NAME}`;
  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
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

// children should prefixed with slash
export const SEOImage = ({ children }: { children: string }) => {
  const fullUrl = `${SITE_URL}${children}`;
  return (
    <Head>
      <meta key="og:image" property="og:image" content={fullUrl} />
      <meta key="twitter:image" name="twitter:image" content={fullUrl} />
    </Head>
  );
};

const UniversalHead = () => {
  const route = useRouter();
  return (
    <>
      <Title force>{SITE_NAME}</Title>
      <Description>
        {"The blog owned by Ryo, about Programing, Painting, and Gaming."}
      </Description>
      <SEOImage>{`/img/home-bg-kasumi-hanabi.jpg`}</SEOImage>
      <Head>
        <meta key="og:type" property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}${route.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ryo_okami" />
        <meta name="twitter:creator" content="@ryo_okami" />
        {/* Facebook Open Graph: https://developers.facebook.com/docs/sharing/webmasters#markup */}
        {/* Twitter Card: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards */}
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
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

/**
 * Migration Redirect Page
 */

import { slugToPath } from "@/statics";
import { getSlugFromOldPath, oldPaths } from "@/statics/redirect";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: oldPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  {},
  { redirects: string[] }
> = async ({ params }) => {
  const oldPath = params?.redirects.join("/") || "";
  const slug = getSlugFromOldPath(oldPath);

  return {
    redirect: {
      destination: slugToPath(slug),
      permanent: false,
    },
  };
};

const RedirectPage = () => {
  return <></>;
};

export default RedirectPage;

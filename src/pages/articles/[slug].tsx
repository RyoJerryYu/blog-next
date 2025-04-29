import { loadCache } from "@/core/indexing/indexing-cache";
import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { buildPostPage } from "@/core/page-template/post-page";
import {
  buildPostGetStaticPaths,
  buildPostGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async (c) => {
  await loadCache();
  return await buildPostGetStaticPaths("articles")(c);
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  await loadCache();
  return await buildPostGetStaticProps("articles", articlePostPathMapper(), {
    withSEO: true,
    withComments: true,
  })({ params });
};

const ArticlePage = buildPostPage();

export default ArticlePage;

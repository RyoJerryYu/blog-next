import { loadCache } from "@/core/indexing/indexing-cache";
import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { PostPage } from "@/core/page-template/post-page";
import {
  postGetStaticPaths,
  postGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  return await postGetStaticPaths("articles");
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  await loadCache();
  const slug = params!.slug;
  return await postGetStaticProps("articles", articlePostPathMapper(), slug, {
    withSEO: true,
    withComments: true,
  });
};

const ArticlePage = PostPage;

export default ArticlePage;

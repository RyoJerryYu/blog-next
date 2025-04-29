import { loadCache } from "@/core/indexing/indexing-cache";
import { ideaPostPathMapper } from "@/core/indexing/indexing-settings";
import { PostPage } from "@/core/page-template/post-page";
import {
  postGetStaticPaths,
  postGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  return await postGetStaticPaths("ideas");
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  await loadCache();
  const slug = params!.slug;
  return await postGetStaticProps("ideas", ideaPostPathMapper(), slug, {
    withSEO: false,
    withComments: false,
  });
};

const IdeaPage = PostPage;

export default IdeaPage;

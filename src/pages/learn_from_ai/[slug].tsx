import { loadCache } from "@/core/indexing/indexing-cache";
import { learnFromAiPostPathMapper } from "@/core/indexing/indexing-settings";
import { PostPage } from "@/core/page-template/post-page";
import {
  postGetStaticPaths,
  postGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  return await postGetStaticPaths("learn_from_ai");
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  await loadCache();
  const slug = params!.slug;
  return await postGetStaticProps(
    "learn_from_ai",
    learnFromAiPostPathMapper(),
    slug,
    {
      withSEO: true,
      withComments: false,
    }
  );
};

const LearnFromAiPage = PostPage;

export default LearnFromAiPage;

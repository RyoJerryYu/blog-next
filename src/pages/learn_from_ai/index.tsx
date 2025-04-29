import { loadCache } from "@/core/indexing/indexing-cache";
import { buildPostIndexPage } from "@/core/page-template/post-page";
import { buildPostIndexGetStaticProps } from "@/core/page-template/post-static";
import { PostIndexPageProps } from "@/core/page-template/post-type";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostIndexPageProps> = async (c) => {
  await loadCache();
  return await buildPostIndexGetStaticProps("learn_from_ai")(c);
};

const LearnFromAiPage = buildPostIndexPage();

export default LearnFromAiPage;

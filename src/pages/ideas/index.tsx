import { loadCache } from "@/core/indexing/indexing-cache";
import { PostIndexPage } from "@/core/page-template/post-page";
import { postIndexGetStaticProps } from "@/core/page-template/post-static";
import { PostIndexPageProps } from "@/core/page-template/post-type";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostIndexPageProps> = async () => {
  await loadCache();
  return await postIndexGetStaticProps("ideas");
};

const IdeasPage = PostIndexPage;

export default IdeasPage;

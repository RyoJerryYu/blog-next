import { loadCache } from "@/core/indexing/indexing-cache";
import { buildPostIndexPage } from "@/core/page-template/post-page";
import { buildPostIndexGetStaticProps } from "@/core/page-template/post-static";
import { PostIndexPageProps } from "@/core/page-template/post-type";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostIndexPageProps> = async (c) => {
  await loadCache();
  return await buildPostIndexGetStaticProps("articles")(c);
};

const ArticlesPage = buildPostIndexPage();

export default ArticlesPage;

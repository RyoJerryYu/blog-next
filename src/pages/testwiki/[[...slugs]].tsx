import { loadCache } from "@/core/indexing/indexing-cache";
import { testwikiPathMapper } from "@/core/indexing/indexing-settings";
import { buildWikiPage } from "@/core/page-template/wiki-page";
import {
  wikiGetStaticPaths,
  wikiGetStaticProps,
} from "@/core/page-template/wiki-static";
import { WikiPageProps } from "@/core/page-template/wiki-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  return await wikiGetStaticPaths("testwiki");
};

export const getStaticProps: GetStaticProps<
  WikiPageProps,
  { slugs: string[] }
> = async ({ params }) => {
  await loadCache();
  const slugs = params!.slugs || [];
  const pathMapper = testwikiPathMapper();
  return await wikiGetStaticProps("testwiki", slugs, pathMapper);
};

const TestWikiPage = buildWikiPage();

export default TestWikiPage;

import { loadCache } from "@/core/indexing/indexing-cache";
import { ygowikiPathMapper } from "@/core/indexing/indexing-settings";
import { WikiPage } from "@/core/page-template/wiki-page";
import {
  wikiGetStaticPaths,
  wikiGetStaticProps,
} from "@/core/page-template/wiki-static";
import { WikiPageProps } from "@/core/page-template/wiki-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  return await wikiGetStaticPaths("ygowiki");
};

export const getStaticProps: GetStaticProps<
  WikiPageProps,
  { slugs: string[] }
> = async ({ params }) => {
  await loadCache();
  const slugs = params!.slugs || [];
  const pathMapper = ygowikiPathMapper();
  return await wikiGetStaticProps("ygowiki", slugs, pathMapper);
};

const YgoWikiPage = WikiPage;

export default YgoWikiPage;

import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Post from "@/components/Post";
import { WikiTreeMenu } from "@/components/wiki/WikiTreeMenu";
import { loadCache } from "@/core/indexing/indexing-cache";
import { testwikiPathMapper } from "@/core/indexing/indexing-settings";
import {
  wikiGetStaticPaths,
  wikiGetStaticProps,
} from "@/core/page-template/wiki-static";
import { WikiPageProps } from "@/core/page-template/wiki-type";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
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

const TestWikiPage = (props: WikiPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <DefaultLayout
        left={
          <WikiTreeMenu
            trees={props.wikiTree.trees}
            currentSlugs={props.slugs}
          />
        }
        right={
          <Anchor
            items={props.meta.headingTrees}
            offsetTop={64}
            className="overflow-y-auto"
          />
        }
      >
        <ParsingProvider>
          <Post
            meta={props.meta}
            tags={props.tags}
            source={props.source}
            prevNextInfo={{ prevInfo: null, nextInfo: null }}
          />
        </ParsingProvider>
        <BackRefList posts={props.backRefResources} />
      </DefaultLayout>
    </>
  );
};

export default TestWikiPage;

import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Post from "@/components/Post";
import { WikiTreeMenu } from "@/components/wiki/WikiTreeMenu";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import { WikiPageProps } from "./wiki-type";

export const WikiPage = (props: WikiPageProps) => {
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

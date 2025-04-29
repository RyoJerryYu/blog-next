import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Post from "@/components/Post";
import { loadCache } from "@/core/indexing/indexing-cache";
import { ideaPostPathMapper } from "@/core/indexing/indexing-settings";
import { postGetStaticPaths } from "@/core/page-template/post-static-paths";
import { postStaticProps } from "@/core/page-template/post-static-props";
import { PostPageProps } from "@/core/page-template/post-types";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";

const resourceType = "ideas";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  return await postGetStaticPaths(resourceType);
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  await loadCache();
  const pathMapper = ideaPostPathMapper();
  const slug = params!.slug;
  return await postStaticProps(slug, pathMapper);
};

const IdeaPage = (props: PostPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <DefaultLayout
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
            prevNextInfo={props.prevNextInfo}
          />
        </ParsingProvider>
        <BackRefList posts={props.backRefResources} />
      </DefaultLayout>
    </>
  );
};

export default IdeaPage;

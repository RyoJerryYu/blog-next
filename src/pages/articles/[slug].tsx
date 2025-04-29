import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { loadCache } from "@/core/indexing/indexing-cache";
import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { postGetStaticPaths } from "@/core/page-template/post-static-paths";
import { postStaticProps } from "@/core/page-template/post-static-props";
import { PostPageProps } from "@/core/page-template/post-types";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";

const resourceType = "articles";

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
  const pathMapper = articlePostPathMapper();
  const slug = params!.slug;
  return await postStaticProps(slug, pathMapper);
};

const ArticlePage = (props: PostPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <SEOObject
        article={{
          publishedTime: props.meta.created_at ?? undefined,
          modifiedTime: props.meta.updated_at ?? undefined,
          tags: props.meta.tags,
        }}
      />
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
        <Comments issue-term={props.slug} />
      </DefaultLayout>
    </>
  );
};

export default ArticlePage;

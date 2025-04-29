import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Post from "@/components/Post";
import {
  getAliasIndex,
  getPostMetaOrReload,
  getPrevNextIndex,
  getResource,
  getTagIndex,
  loadCache,
  mustGetResourceType,
} from "@/core/indexing/indexing-cache";
import { ideaPostPathMapper } from "@/core/indexing/indexing-settings";
import { postGetStaticPaths } from "@/core/page-template/post-static-paths";
import { PostPageProps } from "@/core/page-template/post-types";
import { parseMdx } from "@/core/parsing/rendering-parse";
import { PagePathMapping, PostMeta } from "@/core/types/indexing";
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
  const pagePath = pathMapper.slugToPagePath(slug);
  let meta = await getPostMetaOrReload(pagePath);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    mustGetResourceType(pagePath),
    pagePath
  );
  const backRefPagePaths = getAliasIndex().resolveBackRef(pagePath);
  const backRefResources = backRefPagePaths.map((pagePath) => {
    return getResource<PagePathMapping, PostMeta>(pagePath);
  });

  const tags = getTagIndex().getTagsOf(meta.tags);

  const { source } = await parseMdx(meta.content, {
    pagePath: pagePath,
  });

  const props: PostPageProps = {
    slug,
    tags,
    source,
    meta,
    prevNextInfo,
    backRefResources,
  };
  return { props };
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

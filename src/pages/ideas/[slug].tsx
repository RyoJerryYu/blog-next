import Post from "@/components/Post";
import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder";
import { ideaPostPathMapper } from "@/core/indexing/indexing-settings";
import { PostMeta } from "@/core/indexing/meta-collecting/meta-collecting";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import parseMdx from "@/plugins";
import {
  getPostMetaOrReload,
  getPrevNextIndex,
  getTagIndex,
  ideaResourceMap,
  initCache,
} from "@/statics";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  await initCache();
  const ideaMap = ideaResourceMap();
  const pagePaths = ideaMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

type IdeaPageProps = {
  slug: string;
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
  prevNextInfo: PrevNextInfo;
};

export const getStaticProps: GetStaticProps<
  IdeaPageProps,
  { slug: string }
> = async ({ params }) => {
  await initCache();
  const ideaMap = ideaResourceMap();
  const slug = params!.slug;
  const pagePath = ideaPostPathMapper().slugToPagePath(slug);
  let meta = await getPostMetaOrReload(ideaMap, pagePath);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    "ideas",
    pagePath
  );

  const tagIndex = getTagIndex();
  const tags = tagIndex.getTagsOf(meta.tags);
  const source = await parseMdx(meta.content, {
    remarkObsidianRichOptions: {
      baseDir: "",
    },
  });
  return {
    props: {
      slug,
      tags,
      source,
      meta,
      prevNextInfo,
    },
  };
};

const IdeaPage = (props: IdeaPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <DefaultLayout>
        <Post
          meta={props.meta}
          tags={props.tags}
          source={props.source}
          prevNextInfo={props.prevNextInfo}
        />
      </DefaultLayout>
    </>
  );
};

export default IdeaPage;

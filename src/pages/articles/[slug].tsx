import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder";
import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { PostMeta } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import parseMdx from "@/plugins";
import {
  articleResourceMap,
  getPostMetaOrReload,
  getPrevNextIndex,
  getTagIndex,
  initCache,
} from "@/statics";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  await initCache();
  const articleMap = articleResourceMap();
  const pagePaths = articleMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

type ArticlePageProps = {
  slug: string;
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
  prevNextInfo: PrevNextInfo;
};

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  await initCache();
  const articleMap = articleResourceMap();
  const slug = params!.slug;
  const pagePath = articlePostPathMapper().slugToPagePath(slug);
  const meta = await getPostMetaOrReload(articleMap, pagePath);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    "articles",
    pagePath
  );

  const tags = getTagIndex().getTagsOf(meta.tags);

  const source = await parseMdx(meta.content, {
    remarkObsidianRichOptions: {
      baseDir: "",
    },
  });

  const props: ArticlePageProps = {
    slug,
    tags,
    source,
    meta,
    prevNextInfo,
  };
  // fs.writeFileSync(`temp/${slug}.tmp`, JSON.stringify(props));

  return { props };
};

const ArticlePage = (props: ArticlePageProps) => {
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
      <DefaultLayout>
        <Post
          meta={props.meta}
          tags={props.tags}
          source={props.source}
          prevNextInfo={props.prevNextInfo}
        />
        <Comments issue-term={props.slug} />
      </DefaultLayout>
    </>
  );
};

export default ArticlePage;

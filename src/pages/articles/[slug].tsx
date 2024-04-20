import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder";
import { PostMeta } from "@/core/indexing/meta-collecting/meta-collecting";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import parseMdx from "@/plugins";
import {
  PrevNextInfo,
  articleCache,
  getPostMetaOrReload,
  getTagIndex,
  initCache,
} from "@/statics";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  await initCache();
  const cache = articleCache();
  const paths = cache.getSlugs().map(cache.slugToPath);
  return {
    paths,
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
  const cache = articleCache();
  const slug = params!.slug;
  const meta = await getPostMetaOrReload(cache, slug);
  const prevNextInfo = cache.slugToPrevNextInfo(slug);

  const tags = getTagIndex().getTagsOf(meta.tags);

  const source = await parseMdx(meta.content, {
    remarkObsidianRichOptions: {
      baseDir: cache.slugToMediaDir(slug),
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

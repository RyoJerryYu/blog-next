import Comments from "@/components/Comments";
import Post from "@/components/Post";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import parseMdx from "@/plugins";
import {
  PrevNextInfo,
  articleCache,
  getPostMetaOrReload,
  getTagIndex,
} from "@/statics";
import { PostMeta } from "@/statics/loader";
import { TagInfo } from "@/statics/tag-index";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  const cache = await articleCache();
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
  const cache = await articleCache();
  const slug = params!.slug;
  const meta = await getPostMetaOrReload(cache, slug);
  const prevNextInfo = cache.slugToPrevNextInfo(slug);

  const tags = (await getTagIndex()).getTagsOf(meta.tags);

  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
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
        <Comments />
      </DefaultLayout>
    </>
  );
};

export default ArticlePage;

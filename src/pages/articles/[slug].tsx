import Post from "@/components/Post";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import DefaultLayout from "@/layouts/DefaultLayout";
import parseMdx from "@/plugins";
import { articleCache, getPostMetaOrReload, getTagIndex } from "@/statics";
import { articleLoader, PostMeta } from "@/statics/loader";
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
};

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  const cache = await articleCache();
  const slug = params!.slug;
  let meta = await getPostMetaOrReload(cache, slug);

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
          publishedTime: props.meta.created_at,
          modifiedTime: props.meta.updated_at,
          tags: props.meta.tags,
        }}
      />
      <DefaultLayout>
        <Post meta={props.meta} tags={props.tags} source={props.source} />
      </DefaultLayout>
    </>
  );
};

export default ArticlePage;
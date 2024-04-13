import Post from "@/components/Post";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import parseMdx from "@/plugins";
import {
  PrevNextInfo,
  getPostMetaOrReload,
  getTagIndex,
  ideaCache,
} from "@/statics";
import { PostMeta } from "@/statics/loader";
import { TagInfo } from "@/statics/tag-index";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  const cache = await ideaCache();
  const path = cache.getSlugs().map(cache.slugToPath);
  return {
    paths: path,
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
  const cache = await ideaCache();
  const slug = params!.slug;
  let meta = await getPostMetaOrReload(cache, slug);
  const prevNextInfo = cache.slugToPrevNextInfo(slug);

  const tagIndex = await getTagIndex();
  const tags = tagIndex.getTagsOf(meta.tags);
  const source = await parseMdx(meta.content, {
    remarkObsidianRichOptions: {
      baseDir: cache.slugToMediaDir(slug),
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

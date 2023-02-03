import Post from "@/components/Post";
import WithHeader from "@/layouts/WithHeader";
import parseMdx from "@/plugins";
import { slugs, slugToFile, slugToMatter, slugToPath } from "@/statics";
import { parseMetaFromFile } from "@/statics/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  const paths = slugs().map(slugToPath);
  return {
    paths,
    fallback: false,
  };
};

type PostPageProps = {
  slug: string;
  length: number;
  date: string;
  title: string;
  license: boolean;
  tags: string[];
  source: MDXRemoteSerializeResult;
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  const slug = params!.slug;
  let meta = slugToMatter(slug);
  if (process.env.NODE_ENV === "development") {
    // for reloading in development
    meta = parseMetaFromFile(slugToFile(slug));
  }
  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
      baseDir: `/content/posts/${slug}`,
    },
  });
  const props: PostPageProps = {
    slug,
    source,
    date: meta.created_at,
    length: meta.length,
    title: meta.title,
    tags: meta.tags ?? [],
    license: meta.license ?? false,
  };
  // fs.writeFileSync(`temp/${slug}.tmp`, JSON.stringify(props));

  return { props };
};

const PostPage = (props: PostPageProps) => {
  return (
    <>
      <WithHeader>
        <Post
          title={props.title}
          length={props.length}
          date={props.date}
          license={props.license}
          tags={props.tags}
          source={props.source}
        />
      </WithHeader>
    </>
  );
};

export default PostPage;

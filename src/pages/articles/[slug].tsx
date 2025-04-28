import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { buildPostPage } from "@/core/page-template/post-page";
import {
  buildPostGetStaticPaths,
  buildPostGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths =
  buildPostGetStaticPaths("articles");

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> =
  buildPostGetStaticProps("articles", articlePostPathMapper(), {
    withSEO: true,
    withComments: true,
  });

const ArticlePage = buildPostPage();

export default ArticlePage;

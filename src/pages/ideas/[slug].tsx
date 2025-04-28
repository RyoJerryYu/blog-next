import { ideaPostPathMapper } from "@/core/indexing/indexing-settings";
import { buildPostPage } from "@/core/page-template/post-page";
import {
  buildPostGetStaticPaths,
  buildPostGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = buildPostGetStaticPaths("ideas");

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> =
  buildPostGetStaticProps("ideas", ideaPostPathMapper());

const IdeaPage = buildPostPage({
  withSEO: false,
  withComments: false,
});

export default IdeaPage;

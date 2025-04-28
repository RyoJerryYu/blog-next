import { learnFromAiPostPathMapper } from "@/core/indexing/indexing-settings";
import { buildPostPage } from "@/core/page-template/post-page";
import {
  buildPostGetStaticPaths,
  buildPostGetStaticProps,
} from "@/core/page-template/post-static";
import { PostPageProps } from "@/core/page-template/post-type";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths =
  buildPostGetStaticPaths("learn_from_ai");

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> =
  buildPostGetStaticProps("learn_from_ai", learnFromAiPostPathMapper(), {
    withSEO: true,
    withComments: false,
  });

const LearnFromAiPage = buildPostPage();

export default LearnFromAiPage;

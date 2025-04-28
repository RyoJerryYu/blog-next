import { buildPostIndexPage } from "@/core/page-template/post-page";
import { buildPostIndexGetStaticProps } from "@/core/page-template/post-static";
import { PostIndexPageProps } from "@/core/page-template/post-type";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostIndexPageProps> =
  buildPostIndexGetStaticProps("ideas");

const IdeasPage = buildPostIndexPage();

export default IdeasPage;

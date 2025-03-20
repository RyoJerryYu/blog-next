import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      "/testwiki",
      "/testwiki/page1",
      "/testwiki/page2",
      "/testwiki/page3",
      "/testwiki/page1/subpage1",
      "/testwiki/page1/subpage2",
    ],
    fallback: false,
  };
};

type TestWikiPageProps = {
  slugs: string[];
};

export const getStaticProps: GetStaticProps<
  TestWikiPageProps,
  { slugs: string[] }
> = async ({ params }) => {
  const slugs = params!.slugs || [];
  return {
    props: { slugs },
  };
};

const TestWikiPage = (props: TestWikiPageProps) => {
  console.log(props);
  return <div>slugs: {props.slugs.join("/")}</div>;
};

export default TestWikiPage;

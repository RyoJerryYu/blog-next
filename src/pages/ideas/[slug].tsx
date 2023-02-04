import WithHeader from "@/layouts/WithHeader";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  };
};

type IdeaPageProps = {};

export const getStaticProps: GetStaticProps<
  IdeaPageProps,
  { slug: string }
> = async ({ params }) => {
  return {
    props: {},
  };
};

const IdeaPage = (props: IdeaPageProps) => {
  return (
    <>
      <WithHeader>memo</WithHeader>
    </>
  );
};

export default IdeaPage;

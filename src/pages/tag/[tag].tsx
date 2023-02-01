import WithHeader from "@/layouts/WithHeader";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/tag/1", "/tag/2"],
    fallback: false,
  };
};

type TagPageProps = {
  tag: string;
};
export const getStaticProps: GetStaticProps<
  TagPageProps,
  { tag: string }
> = async ({ params }) => {
  return {
    props: {
      tag: params?.tag || "",
    },
  };
};

const TagPage = ({ tag }: TagPageProps) => {
  return (
    <>
      <WithHeader>
        <div>TagPage {tag}</div>
      </WithHeader>
    </>
  );
};

export default TagPage;

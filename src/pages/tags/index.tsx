import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { GetStaticProps } from "next";

type TagsProps = {};

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  return {
    props: {},
  };
};

const TagsPage = (props: TagsProps) => {
  // TODO only show tags here
  return (
    <>
      <WithHeader>tags</WithHeader>
    </>
  );
};

export default TagsPage;

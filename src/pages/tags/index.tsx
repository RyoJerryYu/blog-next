import PostList from "@/components/PostList";
import TagsBox from "@/components/TagsBox";
import WithHeader from "@/layouts/WithHeader";
import { getTags } from "@/statics";
import { GetStaticProps } from "next";

type TagsProps = {
  tags: string[];
};

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const tagInfos = await getTags();
  const tags = new Set<string>();
  tagInfos.forEach((tagInfo) => tags.add(tagInfo.tag));

  return {
    props: {
      tags: Array.from(tags),
    },
  };
};

const TagsPage = (props: TagsProps) => {
  return (
    <>
      <WithHeader>
        <TagsBox tags={props.tags} />
      </WithHeader>
    </>
  );
};

export default TagsPage;

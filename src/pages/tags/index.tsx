import PostList from "@/components/PostList";
import TagsBox from "@/components/TagsBox";
import WithHeader from "@/layouts/WithHeader";
import { getTagIndex } from "@/statics";
import { TagInfo } from "@/statics/tag-index";
import { GetStaticProps } from "next";

type TagsProps = {
  tagInfos: TagInfo[];
};

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  const tagIndex = await getTagIndex();
  const tagInfos = tagIndex.getTags();

  return {
    props: {
      tagInfos: tagInfos,
    },
  };
};

const TagsPage = (props: TagsProps) => {
  return (
    <>
      <WithHeader>
        <TagsBox tags={props.tagInfos} />
      </WithHeader>
    </>
  );
};

export default TagsPage;

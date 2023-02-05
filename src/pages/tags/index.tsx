import PostList from "@/components/PostList";
import TagsBox from "@/components/TagsBox";
import TagSelector from "@/components/TagSelector";
import MainWidth from "@/layouts/MainWidth";
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
        <MainWidth>
          <TagSelector tags={props.tagInfos} />
        </MainWidth>
      </WithHeader>
    </>
  );
};

export default TagsPage;

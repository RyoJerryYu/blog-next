import TagSelector from "@/components/TagSelector";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { getTagIndex, loadCache } from "@/core/indexing/indexing-cache";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticProps } from "next";

type TagsProps = {
  tagInfos: TagInfo[];
};

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  await loadCache();
  const tagIndex = getTagIndex();
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
      <Title>Tags</Title>
      <DefaultLayout>
        <TagSelector tags={props.tagInfos} />
      </DefaultLayout>
    </>
  );
};

export default TagsPage;

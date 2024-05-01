import TagSelector from "@/components/TagSelector";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/tag-index-builder";
import { getTagIndex, initCache } from "@/core/indexing/indexing-cache";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticProps } from "next";

type TagsProps = {
  tagInfos: TagInfo[];
};

export const getStaticProps: GetStaticProps<TagsProps> = async () => {
  await initCache();
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
        <MainWidth>
          <TagSelector tags={props.tagInfos} />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default TagsPage;

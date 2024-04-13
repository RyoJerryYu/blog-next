import TagSelector from "@/components/TagSelector";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import { getTagIndex, initCache } from "@/statics";
import { TagInfo } from "@/statics/tag-index";
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

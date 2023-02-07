import PostList from "@/components/PostList";
import TagsBox from "@/components/TagsBox";
import TagSelector from "@/components/TagSelector";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import DefaultLayout from "@/layouts/DefaultLayout";
import { getTagIndex } from "@/statics";
import { TagInfo } from "@/statics/tag-index";
import { GetStaticProps } from "next";
import Head from "next/head";

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

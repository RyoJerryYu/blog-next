import PostList from "@/components/PostList";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getPrevNextIndex,
  getTagIndex,
  ideaResourceMap,
  loadCache,
} from "@/core/indexing/indexing-cache";
import { PostResource } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticProps } from "next";

type IdeasProps = {
  posts: PostResource[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<IdeasProps> = async () => {
  await loadCache();
  const ideaMap = ideaResourceMap();
  const prevNextIndex = getPrevNextIndex();

  const pagePaths = prevNextIndex
    .listResources("ideas")
    .map((r) => r.pathMapping.pagePath);
  const posts = pagePaths.map(ideaMap.pagePathToResource);

  const allTags = getTagIndex().getTags();
  return {
    props: {
      posts: posts,
      allTags: allTags,
    },
  };
};

const IdeasPage = (props: IdeasProps) => {
  const allTagsMap = tagInfoListToMap(props.allTags);
  return (
    <>
      <Title>Ideas</Title>
      <DefaultLayout>
        <PostList posts={props.posts} allTags={allTagsMap} />
      </DefaultLayout>
    </>
  );
};

export default IdeasPage;

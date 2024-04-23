import PostList from "@/components/PostList";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import {
  Post,
  getPrevNextIndex,
  getTagIndex,
  ideaResourceMap,
  initCache,
  resourceToPost,
} from "@/statics";
import { GetStaticProps } from "next";

type IdeasProps = {
  posts: Post[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<IdeasProps> = async () => {
  await initCache();
  const ideaMap = ideaResourceMap();
  const prevNextIndex = getPrevNextIndex();

  const pagePaths = prevNextIndex
    .listResources("ideas")
    .map((r) => r.pathMapping.pagePath);
  const posts = pagePaths.map(ideaMap.pagePathToResource).map(resourceToPost);

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
        <MainWidth>
          <PostList
            posts={props.posts}
            allTags={allTagsMap}
            getUrl={(idea) => idea.pagePath}
          />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default IdeasPage;

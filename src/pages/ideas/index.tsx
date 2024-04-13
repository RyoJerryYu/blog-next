import PostList from "@/components/PostList";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import { getTagIndex, ideaCache, initCache, Post } from "@/statics";
import { TagInfo, tagInfoListToMap } from "@/statics/tag-index";
import { sortPostsByDate } from "@/statics/utils";
import { GetStaticProps } from "next";

type IdeasProps = {
  posts: Post[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<IdeasProps> = async () => {
  await initCache();
  const cache = ideaCache();
  const slugs = cache.getSlugs();
  const posts = sortPostsByDate(slugs.map(cache.slugToPost));

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
            getUrl={(idea) => idea.path}
          />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default IdeasPage;

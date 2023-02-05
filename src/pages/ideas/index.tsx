import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { getTagIndex, ideaCache, Post } from "@/statics";
import { TagInfo, tagInfoListToMap } from "@/statics/tag-index";
import { GetStaticProps } from "next";

type IdeasProps = {
  posts: Post[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<IdeasProps> = async () => {
  const cache = await ideaCache();
  const slugs = cache.getSlugs();
  const posts = slugs.map(cache.slugToPost);

  const allTags = (await getTagIndex()).getTags();
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
      <WithHeader>
        <PostList
          posts={props.posts}
          allTags={allTagsMap}
          getUrl={(idea) => idea.path}
        />
      </WithHeader>
    </>
  );
};

export default IdeasPage;

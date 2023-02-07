import PostList from "@/components/PostList";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import DefaultLayout from "@/layouts/DefaultLayout";
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

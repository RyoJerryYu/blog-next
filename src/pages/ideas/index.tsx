import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { ideaCache, Post } from "@/statics";
import { GetStaticProps } from "next";

type IdeasProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<IdeasProps> = async () => {
  const cache = await ideaCache();
  const slugs = cache.getSlugs();
  const posts = slugs.map(cache.slugToPost);
  return {
    props: {
      posts: posts,
    },
  };
};

const IdeasPage = (props: IdeasProps) => {
  return (
    <>
      <WithHeader>
        <PostList posts={props.posts} getUrl={(idea) => idea.path} />
      </WithHeader>
    </>
  );
};

export default IdeasPage;

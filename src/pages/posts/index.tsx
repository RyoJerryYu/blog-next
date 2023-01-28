import PostList from "@/components/PostList";
import { blogFiles, getSlugFromFile } from "@/utils/pages";
import { getPostMatter, PostMatter } from "@/utils/post-matter";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const slugs = blogFiles.map(getSlugFromFile);
  const matters: PostMatter[] = [];
  for (const slug of slugs) {
    const matter = await getPostMatter(slug);
    matters.push(matter);
  }

  return {
    props: {
      postMatters: matters,
    },
  };
};

type PostsProps = {
  postMatters: PostMatter[];
};

const Post = ({ postMatters }: PostsProps) => {
  return (
    <>
      <PostList
        postMatters={postMatters}
        getUrl={(post) => `/posts/${post.slug}`}
      />
    </>
  );
};

export default Post;

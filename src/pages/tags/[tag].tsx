import PostList from "@/components/PostList";
import TagsBox from "@/components/TagsBox";
import WithHeader from "@/layouts/WithHeader";
import { articleCache, getTags, getTagsOf, ideaCache, Post } from "@/statics";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const tagInfos = await getTags();
  const paths = tagInfos.map((tag) => tag.path);

  return {
    paths: paths,
    fallback: false,
  };
};

type TagPageProps = {
  allTags: string[];
  focusTag: string;
  posts: Post[];
};
export const getStaticProps: GetStaticProps<
  TagPageProps,
  { tag: string }
> = async ({ params }) => {
  const tagInfos = await getTags();
  const focusTagInfos = await getTagsOf([params!.tag]);
  const postSlugInfos = focusTagInfos[0].postSlugs;

  const posts: Set<Post> = new Set();
  const articleCaches = await articleCache();
  postSlugInfos
    .filter((slugInfo) => slugInfo.postType === "article")
    .forEach((slugInfo) =>
      posts.add(articleCaches.slugToPost(slugInfo.postSlug))
    );
  const ideaCaches = await ideaCache();
  postSlugInfos
    .filter((slugInfo) => slugInfo.postType === "idea")
    .forEach((slug) => posts.add(ideaCaches.slugToPost(slug.postSlug)));

  const props = {
    allTags: tagInfos.map((tag) => tag.tag),
    focusTag: params!.tag,
    posts: Array.from(posts),
  };
  console.log(props);
  return {
    props: props,
  };
};

const TagPage = (props: TagPageProps) => {
  return (
    <>
      <WithHeader>
        <TagsBox tags={props.allTags} />
        <PostList posts={props.posts} getUrl={(post) => post.path} />
      </WithHeader>
    </>
  );
};

export default TagPage;

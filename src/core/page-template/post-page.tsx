import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Comments from "@/components/Comments";
import Post from "@/components/Post";
import PostList from "@/components/PostList";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import { tagInfoListToMap } from "../indexing/index-building/tag-index-builder/types";
import { PostIndexPageProps, PostPageProps } from "./post-type";

export const PostPage = (props: PostPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      {props.hyperProps.withSEO && (
        <SEOObject
          article={{
            publishedTime: props.meta.created_at ?? undefined,
            modifiedTime: props.meta.updated_at ?? undefined,
            tags: props.meta.tags,
          }}
        />
      )}
      <DefaultLayout
        right={
          <Anchor
            items={props.meta.headingTrees}
            offsetTop={64}
            className="overflow-y-auto"
          />
        }
      >
        <ParsingProvider>
          <Post
            meta={props.meta}
            tags={props.tags}
            source={props.source}
            prevNextInfo={props.prevNextInfo}
          />
        </ParsingProvider>
        <BackRefList posts={props.backRefResources} />
        {props.hyperProps.withComments && <Comments issue-term={props.slug} />}
      </DefaultLayout>
    </>
  );
};

export const PostIndexPage = (props: PostIndexPageProps) => {
  const allTagsMap = tagInfoListToMap(props.allTagsList);
  return (
    <>
      <Title>Articles</Title>
      <DefaultLayout>
        <PostList posts={props.posts} allTags={allTagsMap} />
      </DefaultLayout>
    </>
  );
};

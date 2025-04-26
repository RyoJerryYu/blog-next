import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta, PostResource } from "@/core/types/indexing";
import Link from "next/link";
import TagsBox from "../TagsBox";

type BackRefListElementProps = {
  postMeta: PostMeta;
  url: string;
};

const BackRefListElement = ({ postMeta, url }: BackRefListElementProps) => {
  let tags: TagInfo[] = postMeta.tags.map((tag) => {
    return {
      tag: tag,
      slug: tag,
      path: "",
      postSlugs: [],
    };
  });
  if (tags.length > 0) {
    tags = tags.slice(0, 3);
  }
  return (
    <div className="flex-1 p-2 rounded-md hover:bg-bg-focus">
      <Link href={url} className="flex items-center">
        <div className="text-lg flex-grow h-fit overflow-ellipsis">
          {postMeta.title}
        </div>
        <TagsBox tags={tags} className="py-4 md:py-1 flex-none" />
      </Link>
    </div>
  );
};

export type BackRefListProps = {
  posts: PostResource[];
};

export default function BackRefList({ posts }: BackRefListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div>
      <h5 className="text-2xl font-bold pt-4">反向引用</h5>
      {posts.map((post) => (
        <BackRefListElement
          key={post.pathMapping.pagePath}
          postMeta={post.meta}
          url={post.pathMapping.pagePath}
        />
      ))}
      <hr className="mt-4" />
    </div>
  );
}

import dayjs from "dayjs";
import { Post } from ".";
import { TagInfo } from "./tag-index";

// a helper function to sort posts by created at desc
export const sortPostsByDate = (posts: Post[]) => {
  return posts.sort((a, b) => {
    return dayjs(b.meta.created_at).unix() - dayjs(a.meta.created_at).unix();
  });
};

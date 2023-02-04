export const oldPaths = [
  "/2022/08/20/2022-08-20-introduction-for-k8s-2/",
  "/2022/08/13/2022-08-13-introduction-for-k8s/",
];

// without slash at the beginning and the end
const getSlug = /\d{4}\/\d{2}\/\d{2}\/\d{4}-\d{2}-\d{2}-([^/]+)/;

export const getSlugFromOldPath = (oldPath: string) => {
  const slug = oldPath.match(getSlug)?.[1];
  if (!slug) {
    throw new Error(`Invalid get slug from old path: oldPath:${oldPath}`);
  }
  return slug;
};

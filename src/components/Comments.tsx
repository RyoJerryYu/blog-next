import useScript from "@/hooks/use-script";
import { useRef } from "react";

export type CommentsProps = {
  theme?: string;
  "issue-term"?: string;
  repo?: string;
  label?: string;
};

const Comments = (props?: CommentsProps) => {
  const comment = useRef(null);

  const status = useScript({
    url: "https://utteranc.es/client.js",
    attributes: {
      theme: props?.theme ?? "github-light",
      "issue-term": props?.["issue-term"] ?? "pathname",
      repo: props?.repo ?? "RyoJerryYu/blog-next",
      label: props?.label ?? "comment",
    },
    ref: comment,
  });

  return (
    <div className="w-full">
      <div ref={comment} />
      {status === "error" && (
        <div className="text-center text-red-500">
          Error loading comments. Please try again later.
        </div>
      )}
    </div>
  );
};

export default Comments;

import useScript from "@/hooks/use-script";
import { useRef } from "react";

const Comments = () => {
  const comment = useRef(null);

  const status = useScript({
    url: "https://utteranc.es/client.js",
    attributes: {
      theme: "github-light",
      "issue-term": "pathname",
      repo: "RyoJerryYu/blog-next",
      label: "comment",
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

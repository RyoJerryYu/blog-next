import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { Post } from "@/statics";
import { GetStaticProps } from "next";

type IdeasProps = {
  pages: Post[];
};

export const getStaticProps: GetStaticProps<IdeasProps> = async () => {
  return {
    props: {
      pages: [],
    },
  };
};

const IdeasPage = (props: IdeasProps) => {
  return (
    <>
      <WithHeader>
        <PostList
          posts={props.pages}
          getUrl={(memo) => `/ideas/${memo.slug}`}
        />
      </WithHeader>
    </>
  );
};

export default IdeasPage;

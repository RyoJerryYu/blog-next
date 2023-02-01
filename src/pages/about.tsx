import WithHeader from "@/layouts/WithHeader";
import { GetStaticPaths, GetStaticProps } from "next";

type AboutPageProps = {};
export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  return {
    props: {},
  };
};

const AboutPage = ({}: AboutPageProps) => {
  return (
    <>
      <WithHeader>
        <div>AboutPage</div>
      </WithHeader>
    </>
  );
};

export default AboutPage;

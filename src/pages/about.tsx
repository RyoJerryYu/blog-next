import { Title } from "@/layouts/UniversalHead";
import WithHeader from "@/layouts/WithHeader";
import { GetStaticProps } from "next";

type AboutPageProps = {};
export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  return {
    props: {},
  };
};

const AboutPage = ({}: AboutPageProps) => {
  return (
    <>
      <Title>About</Title>
      <WithHeader>
        <div>AboutPage</div>
      </WithHeader>
    </>
  );
};

export default AboutPage;

import { Title } from "@/layouts/UniversalHead";
import DefaultLayout from "@/layouts/DefaultLayout";
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
      <DefaultLayout>
        <div>AboutPage</div>
      </DefaultLayout>
    </>
  );
};

export default AboutPage;

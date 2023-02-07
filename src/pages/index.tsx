import HomeCategoryList, {
  HomeCategoryItem,
  HomeCategoryListProps,
} from "@/components/HomeCategoryList";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BASE_PATH } from "@/utils/env-var";
import { Inter } from "@next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  return {
    props: {
      inter,
    },
  };
}

export default function Home() {
  const bgUrl = `${BASE_PATH}/img/home-bg-kasumi-hanabi.jpg`;
  const bgClass = "bg-[url(" + bgUrl + ")]";

  const categoryListItems: HomeCategoryItem[] = [
    {
      title: "Articles",
      href: "/articles",
      bgUrl: bgUrl,
    },
    {
      title: "Ideas",
      href: "/ideas",
      bgUrl: bgUrl,
    },
  ];
  return (
    <>
      <DefaultLayout withFullScreen>
        <div
          className={`h-screen w-screen bg-green-200 flex items-center justify-center bg-no-repeat bg-center bg-cover `}
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          <div className="flex flex-col items-center">
            <div className="text-6xl text-slate-200">{`Ryo's Blog`}</div>
            <div className=" text-3xl text-slate-200 mt-8">
              {"About Tech, Paint, and Games."}
            </div>
          </div>
        </div>
        <HomeCategoryList items={categoryListItems} />
      </DefaultLayout>
    </>
  );
}

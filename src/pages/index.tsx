import HomeCategoryList, {
  HomeCategoryItem,
} from "@/components/HomeCategoryList";
import BgKasumiHanabi, {
  HomeKasumiDigimon,
  HomeKasumiGakkou,
  HomeKasumiTanjyoubi,
} from "@/components/imgs/BgKasumiHanabi";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BASE_PATH } from "@/utils/env-var";
import { Inter } from "@next/font/google";

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

  const categoryListItems: HomeCategoryItem[] = [
    {
      title: "Articles",
      href: "/articles",
      BgComponent: HomeKasumiGakkou,
    },
    {
      title: "Ideas",
      href: "/ideas",
      BgComponent: HomeKasumiDigimon,
    },
  ];
  return (
    <>
      <DefaultLayout withFullScreen>
        <div
          className={`h-screen w-screen flex items-center justify-center bg-no-repeat bg-center bg-cover `}
        >
          <div className=" absolute z-0 flex flex-col items-center">
            <div className="text-6xl text-slate-200">{`Ryo's Blog`}</div>
            <div className=" text-3xl text-slate-200 mt-8">
              {"About Tech, Paint, and Games."}
            </div>
          </div>
          <div className=" absolute -z-10  w-full h-full flex justify-center items-center overflow-hidden">
            <BgKasumiHanabi className="min-h-full min-w-full object-cover" />
          </div>
        </div>
        <HomeCategoryList items={categoryListItems} />
      </DefaultLayout>
    </>
  );
}

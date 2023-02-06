import WithHeader from "@/layouts/WithHeader";
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
  return (
    <>
      <WithHeader withFullScreen>
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
        <p className=" h-64">Hello From my next.js app!</p>
        <p className=" bg-slate-400 h-32 flex items-center">
          more content here...
        </p>
        <div>Footer here...</div>
      </WithHeader>
    </>
  );
}

import WithHeader from "@/layouts/WithHeader";
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
  return (
    <>
      <WithHeader withFullScreen>
        <div className="h-screen w-screen bg-green-200 flex items-center justify-center">
          Poster Should be Full Screen
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

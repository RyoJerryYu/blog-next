import HomeCategoryList, {
  HomeCategoryItem,
} from "@/components/HomeCategoryList";
import BgKasumiHanabi, {
  HomeKasumiDigimon,
  HomeKasumiGakkou,
} from "@/components/imgs/BgKasumiHanabi";
import DefaultLayout from "@/layouts/DefaultLayout";
import { resourcePath } from "@/utils/path-resolve";
import { Box, Stack, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import style from "./Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  return {
    props: {
      inter,
    },
  };
}

export default function Home() {
  const bgUrl = resourcePath("/img/home-bg-kasumi-hanabi.jpg");

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
        <Box
          sx={{
            height: "100vh", // h-screen
            width: "100%", // w-full
            display: "flex", // flex
            alignItems: "center", // items-center
            justifyContent: "center", // justify-center
            backgroundRepeat: "no-repeat", // bg-no-repeat
            backgroundPosition: "center", // bg-center
            backgroundSize: "cover", // bg-cover
            position: "relative",
          }}
        >
          <Stack
            direction="column"
            alignItems="center"
            sx={{
              position: "absolute", // absolute
              zIndex: 0, // z-0
              display: "flex", // flex
              flexDirection: "column", // flex-col
              alignItems: "center", // items-center
            }}
          >
            <Typography
              sx={{
                fontSize: "3.75rem", // text-6xl
                lineHeight: 1, // text-6xl line-height
                color: "rgb(226, 232, 240)", // text-slate-200
              }}
            >
              {`Ryo's Blog`}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.875rem", // text-3xl
                lineHeight: "2.25rem", // text-3xl line-height
                color: "rgb(226, 232, 240)", // text-slate-200
                marginTop: "2rem", // mt-8
              }}
            >
              {"About Tech, Paint, and Games."}
            </Typography>
          </Stack>
          <Box
            sx={{
              position: "absolute", // absolute
              zIndex: -10, // -z-10
              width: "100%", // w-full
              height: "100%", // h-full
              display: "flex", // flex
              justifyContent: "center", // justify-center
              alignItems: "center", // items-center
              overflow: "hidden", // overflow-hidden
              backgroundColor: "rgb(15, 23, 42)", // bg-slate-900
            }}
          >
            <BgKasumiHanabi className={style.bgImage} />
          </Box>
        </Box>
        <HomeCategoryList items={categoryListItems} />
      </DefaultLayout>
    </>
  );
}

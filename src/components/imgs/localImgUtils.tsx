import { BASE_PATH } from "@/utils/env-var";
import Image from "next/image";

type LocalImgProps = {
  alt?: string;
  className?: string;
};
export type LocalImgComponent = React.FC<LocalImgProps>;

export type BgImgMeta = {
  bgUrlSuffix: string;
  width: number;
  height: number;
};
export function makeLocalImgComponent(meta: BgImgMeta): LocalImgComponent {
  const bgUrl = `${BASE_PATH}/img/${meta.bgUrlSuffix}`;
  return function LocalImg(props: LocalImgProps) {
    return (
      <Image
        alt={props.alt ?? ""}
        src={bgUrl}
        className={props.className}
        width={meta.width}
        height={meta.height}
      />
    );
  };
}

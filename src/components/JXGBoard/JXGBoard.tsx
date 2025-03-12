import { dynamicLoading } from "../Loading/dynamic-loading";
import { JXGBoardProps } from "./types/JXGBoardProps";

const JXGBoardImpl = dynamicLoading(
  async () => (await import("./clientComponent/JXGBoardImpl")).JXGBoardImpl
);

export function JXGBoard(props: JXGBoardProps) {
  return (
    <div className="relative h-[600px] py-4">
      <JXGBoardImpl {...props} />
    </div>
  );
}

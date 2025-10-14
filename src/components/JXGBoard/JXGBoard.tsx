import { Box } from "@mui/material";
import { dynamicLoading } from "../Loading/dynamic-loading";
import { JXGBoardProps } from "./types/JXGBoardProps";

const JXGBoardImpl = dynamicLoading(
  async () => (await import("./clientComponent/JXGBoardImpl")).JXGBoardImpl
);

export function JXGBoard(props: JXGBoardProps) {
  return (
    <Box sx={{ width: "100%", aspectRatio: "1/1" }}>
      <JXGBoardImpl {...props} />
    </Box>
  );
}

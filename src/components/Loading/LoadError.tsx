import { Box } from "@mui/material";

export function LoadError() {
  return (
    <Box
      sx={{
        position: "absolute", // absolute
        inset: 0, // inset-0
        display: "flex", // flex
        alignItems: "center", // items-center
        justifyContent: "center", // justify-center
      }}
    >
      Error...
    </Box>
  );
}

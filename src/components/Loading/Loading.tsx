import { CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <div className="inset-0 w-full h-full flex items-center justify-center bg-bg-focus2">
      <CircularProgress />
    </div>
  );
}

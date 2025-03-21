import { CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg-focus2">
      <CircularProgress />
    </div>
  );
}

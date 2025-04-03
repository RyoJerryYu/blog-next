import { CircularProgress } from "@mui/material";
import clsx from "clsx";

export function Loading(props: { isTransparent?: boolean }) {
  return (
    <div
      className={clsx(
        "inset-0 w-full h-full flex items-center justify-center",
        props.isTransparent ? "bg-transparent" : "bg-bg-focus2"
      )}
    >
      <CircularProgress />
    </div>
  );
}

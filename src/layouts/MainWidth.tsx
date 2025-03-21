import { Grid2 } from "@mui/material";

export type MainWidthProps = {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function MainWidth(props: MainWidthProps) {
  return (
    <Grid2
      container
      sx={{
        width: "100%",
        maxWidth: "80rem",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0.5rem",
        justifyContent: "center",
      }}
    >
      <Grid2 size={{ xs: 0, md: 0, lg: 2 }}>{props.left}</Grid2>
      <Grid2 size={{ xs: 12, md: 8, lg: 8 }}>{props.children}</Grid2>
      <Grid2 size={{ xs: 0, md: 4, lg: 2 }}>{props.right}</Grid2>
    </Grid2>
  );
}

import { Grid } from "@mui/material";

export type MainWidthProps = {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function MainWidth(props: MainWidthProps) {
  return (
    <Grid
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
      <Grid size={{ xs: 0, md: 0, lg: 2 }}>{props.left}</Grid>
      <Grid size={{ xs: 12, md: 9, lg: 8 }}>{props.children}</Grid>
      <Grid size={{ xs: 0, md: 3, lg: 2 }}>{props.right}</Grid>
    </Grid>
  );
}

import { useContainerDimensions } from "@/hooks/use-container-dimensions";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, Fab, Grid } from "@mui/material";
import { useRef, useState } from "react";

export type MainWidthProps = {
  children: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

type GridSize = {
  left: number;
  right: number;
  children: number;
};

export default function MainWidth(props: MainWidthProps) {
  // first hide right, then hide left
  const size: Record<"xs" | "md" | "lg", GridSize> = {
    lg: { left: 2, children: 8, right: 2 },
    md: { left: 3, children: 9, right: 0 },
    xs: { left: 0, children: 12, right: 0 },
  };

  // but if only right, should not hide right before left
  if (props.right && !props.left) {
    size.md = { left: 0, children: 9, right: 3 };
  }

  const leftRef = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(leftRef);
  const needDrawer = props.left && width < 10;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
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
        <Grid size={{ xs: size.xs.left, md: size.md.left, lg: size.lg.left }}>
          <Box ref={leftRef} sx={{ width: "100%", height: "100%" }}>
            {needDrawer ? null : props.left}
          </Box>
        </Grid>
        <Grid
          size={{
            xs: size.xs.children,
            md: size.md.children,
            lg: size.lg.children,
          }}
        >
          {props.children}
        </Grid>
        <Grid
          size={{ xs: size.xs.right, md: size.md.right, lg: size.lg.right }}
        >
          {props.right}
        </Grid>
      </Grid>
      {needDrawer ? (
        <>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            anchor="left"
          >
            <Box sx={{ minWidth: "30vw" }}>{props.left}</Box>
          </Drawer>
          <Fab
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: "absolute",
              right: "1rem",
              bottom: "1rem",
            }}
          >
            <MenuIcon />
          </Fab>
        </>
      ) : null}
    </>
  );
}

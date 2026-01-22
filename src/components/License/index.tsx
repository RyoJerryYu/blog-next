import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type LicenseProps = {};

export default function License({}: LicenseProps) {
  return (
    <Box
      sx={{
        width: "24rem", // w-96
        color: "rgb(55, 65, 81)", // text-gray-700
        lineHeight: 1, // leading-none
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: "0.875rem", // text-sm
          lineHeight: "1.25rem", // text-sm line-height
        }}
      >
        <Link
          href="http://creativecommons.org/licenses/by-nc/4.0/"
          rel="license"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-block", // inline-block
              padding: 0, // p-0
              margin: 0, // m-0
              verticalAlign: "text-bottom", // align-text-bottom
            }}
          >
            <Box
              component="span"
              sx={{
                display: "inline-block",
                height: "1rem", // h-4
                width: "auto", // w-auto
                paddingRight: "0.25rem", // pr-1
                "& img": {
                  margin: 0,
                  height: "1rem",
                  width: "auto",
                },
              }}
            >
              <Image
                alt="Creative Commons License"
                style={{ borderWidth: "0", margin: 0 }}
                width={88}
                height={31}
                src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
              />
            </Box>
          </Box>
        </Link>
        This work is licensed under a{" "}
        <MuiLink
          href="http://creativecommons.org/licenses/by-nc/4.0/"
          rel="license"
          underline="always" // underline
          sx={{ color: "inherit" }}
        >
          Creative Commons Attribution-NonCommercial 4.0 International License
        </MuiLink>
        .
      </Typography>
    </Box>
  );
}

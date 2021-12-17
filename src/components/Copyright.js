import { Typography, Link } from "@mui/material";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      noWrap
      align="center"
      sx={{ position: "relative", pt: 1, bottom: 0 }}
      {...props}
    >
      Lite Funds {new Date().getFullYear()}
      <br />
      {" Created by "}
      <Link
        href="https://github.com/pawel-peksa"
        color="inherit"
        variant="body2"
      >
        {"Paweł Peksa"}
      </Link>
    </Typography>
  );
};

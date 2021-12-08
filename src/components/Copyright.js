import { Typography, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="secondary.light"
      noWrap
      align="center"
      {...props}
    >
      Lite Funds {new Date().getFullYear()}
      <br />
      {" Created with "}
      <FavoriteIcon
        fontSize="small"
        sx={{ position: "relative", top: 5 }}
      /> by{" "}
      <Link
        href="https://github.com/pawel-peksa"
        color="secondary.light"
        // underline="hover"
        variant="body2"
      >
        {"Paweł Peksa"}
      </Link>
    </Typography>
  );
};

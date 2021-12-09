import { Typography, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      noWrap
      align="center"
      sx={{
        position: "fixed",
        bottom: 5,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 0,
      }}
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
        color="inherit"
        variant="body2"
      >
        {"Paweł Peksa"}
      </Link>
    </Typography>
  );
};

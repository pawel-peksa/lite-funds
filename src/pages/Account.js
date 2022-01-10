import { Grid, Paper, Typography } from "@mui/material";
import { useSession } from "../auth/UserProvider";
import { AccountMail } from "../components/AccountMail";
import { AccountGoogle } from "../components/AccountGoogle";
import { ifEmailProvider } from "../auth/ifEmailProvider";

export const Account = () => {
  const { user } = useSession();

  let body;

  if (user.uid === "2kG5LjFEkXasvjgTVS1eGv9iXn43") {
    body = (
      <Typography
        align="center"
        color="primary.main"
        variant="h6"
        element="span"
        sx={{ mt: 10, pb: 10 }}
      >
        demo account cannot be modified
      </Typography>
    );
  } else {
    body = (
      <>
        <Typography
          align="center"
          color="primary.main"
          variant="h6"
          element="span"
        >
          {user.email}
        </Typography>
        {ifEmailProvider(user) ? <AccountMail /> : <AccountGoogle />}
      </>
    );
  }

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={12} md={7}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography align="center" gutterBottom variant="h5" element="h2">
            Account settings
          </Typography>

          {body}
        </Paper>
      </Grid>
    </Grid>
  );
};

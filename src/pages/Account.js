import { Grid, Paper, Typography } from "@mui/material";
import { useSession } from "../auth/UserProvider";
import { AccountMail } from "../components/AccountMail";
import { AccountGoogle } from "../components/AccountGoogle";
import { ifEmailProvider } from "../auth/ifEmailProvider";

export const Account = () => {
  const { user } = useSession();

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

          <Typography
            align="center"
            color="primary.main"
            variant="h6"
            element="span"
          >
            {user.email}
          </Typography>
          {ifEmailProvider(user) ? <AccountMail /> : <AccountGoogle />}
        </Paper>
      </Grid>
    </Grid>
  );
};

import React from "react";
import { connect, useSelector } from "react-redux";

// Components
import Profile from "./profile/profile";
import RecentPosts from "./posts/recentPosts";
import Alert from "./../alert/alert";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Paper } from "@material-ui/core";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
  },
}));

// Dashboard component
const Dashboard = () => {
  const classes = useStyles();
  // Get the errors from Store
  const errors = useSelector((state) => state.alertReducer.errors);
  return (
    <div className={classes.root}>
      <Alert errors={errors} />
      <Container maxWidth='md'>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Profile />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <RecentPosts />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Dashboard);

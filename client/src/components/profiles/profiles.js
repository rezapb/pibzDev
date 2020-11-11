import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import {
  clearLastProfile,
  getProfileById,
} from "./../../actions/profileAction";

// Components
import Profile from "./profile";
import UserPosts from "./userPosts";

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

// Profiles Component
const Profiles = ({ clearLastProfile, getProfileById, match }) => {
  const classes = useStyles();
  useEffect(() => {
    clearLastProfile();
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Profile />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <UserPosts userId={match.params.id} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({});

Profiles.propTypes = {
  clearLastProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { clearLastProfile, getProfileById })(
  Profiles
);

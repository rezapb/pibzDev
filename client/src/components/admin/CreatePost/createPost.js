import React from "react";
import { connect } from "react-redux";

// Components
import UploadFile from "./uploadFile";
import PostContent from "./postContent";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Paper, Container } from "@material-ui/core";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  parent: {
    marginTop: theme.spacing(2),
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth='md' className={classes.parent}>
        <Grid item xs={12}>
          <Box margin={2}>
            <Paper>
              <UploadFile />
            </Paper>
          </Box>
          <Box margin={2}>
            <Paper>
              <PostContent />
            </Paper>
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CreatePost);

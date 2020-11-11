import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, Chip, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

// Actions
import {
  getAllPosts,
  clearLastPost,
  clearPosts,
} from "./../../../actions/postsAction";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  postParent: {
    position: "relative",
    "&:hover": {
      "& $postDetail": {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  postView: {
    // position: "absolute",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    minHeight: "100px",
  },
  postDetail: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    position: "absolute",
    zIndex: 9,
    padding: theme.spacing(2),
    width: "100%",
    height: "calc(100% - 5px)",
    top: "0",
    transition: " background-color 0.2s ease-in-out",
  },
  chip: {
    margin: theme.spacing(0.5),
    cursor: "pointer",
    // color: "#000",
  },
  title: {
    // fontSize: 24,
    // fontWeight: 900,
    color: "#fff",
  },
  postsTitle: {
    textAlign: "center",
    paddingTop: theme.spacing(2),
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}));

const RecentPosts = ({
  getAllPosts,
  postsData,
  loading,
  clearLastPost,
  clearPosts,
}) => {
  const classes = useStyles();
  useEffect(() => {
    clearLastPost();
    clearPosts();
    getAllPosts();
  }, []);

  // Get each post image
  const renderPostImage = (imagename) => {
    if (imagename.length === 0) {
      return (
        <Box>
          <Skeleton variant='rect' width='100%' height={118} />
          <Skeleton />
          <Skeleton width='60%' />
        </Box>
      );
    } else {
      return <img className={classes.img} src={"/images/" + imagename} />;
    }
  };

  const renderPosts = () => {
    const size = 3; // Can later change to let and get the number from user to show how many post
    if (loading && postsData.length === 0)
      return (
        <Box margin={2}>
          <Box>
            <Skeleton variant='rect' width='100%' height={118} />
            <Skeleton />
            <Skeleton width='60%' />
          </Box>
          <Box>
            <Skeleton variant='rect' width='100%' height={118} />
            <Skeleton />
            <Skeleton width='60%' />
          </Box>
          <Box>
            <Skeleton variant='rect' width='100%' height={118} />
            <Skeleton />
            <Skeleton width='60%' />
          </Box>
        </Box>
      );
    else if (!loading && postsData.length === 0) return <div>No Posts</div>;
    else
      return postsData.slice(0, size).map((post, index) => {
        return (
          <Box className={classes.postParent} key={index} mr={2} ml={2}>
            <Link to={`posts/${post._id}`}>
              <Box className={classes.postView}>
                <Box>{renderPostImage(post.image)}</Box>
                <Grid item xs={12} className={classes.postDetail}>
                  <Typography
                    variant='body2'
                    className={classes.title}
                    variant='subtitle1'
                    paragraph
                  >
                    {post.title}
                  </Typography>
                  <Box>
                    {post.tags.slice(0, 1).map((tag, index) => {
                      return (
                        <Chip
                          key={index}
                          // variant='outlined'
                          className={classes.chip}
                          label={tag.label}
                        />
                      );
                    })}
                  </Box>
                </Grid>
              </Box>
            </Link>
          </Box>
        );
      });
  };
  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.postsTitle}>
        <Typography variant='h6' color='secondary' paragraph>
          آخرین مقالات
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Box>{renderPosts()}</Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postsData: state.postReducer.posts,
  loading: state.postReducer.loading,
});

RecentPosts.propTypes = {
  loading: PropTypes.bool,
  getAllPosts: PropTypes.func,
  clearLastPost: PropTypes.func,
  clearPosts: PropTypes.func,
  postsData: PropTypes.array,
};

export default connect(mapStateToProps, {
  getAllPosts,
  clearLastPost,
  clearPosts,
})(RecentPosts);

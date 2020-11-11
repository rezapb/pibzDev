import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import Search from "./search";

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Chip,
  Button,
  Container,
  Paper,
  IconButton,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { LocalOffer, ChevronRight, ChevronLeft } from "@material-ui/icons";

// Actions
import {
  getAllPosts,
  clearLastPost,
  getPostsCount,
  clearPostsCount,
  clearPosts,
} from "./../../actions/postsAction";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    minHeight: "100px",
    verticalAlign: "middle",
  },
  chip: {
    margin: theme.spacing(0.5),
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
  readMore: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  postView: {
    alignItems: "center",
  },
  pagination: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationBtn: {
    margin: theme.spacing(2),
  },
  [theme.breakpoints.down("xs")]: {
    postView: {
      flexDirection: "column-reverse",
      "& > div": {
        minWidth: "100%",
      },
    },
  },
}));

const Posts = ({
  getAllPosts,
  postsData,
  loading,
  clearLastPost,
  getPostsCount,
  clearPostsCount,
  postsCount,
  clearPosts,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(1);

  useEffect(() => {
    clearLastPost();
    clearPosts();
    clearPostsCount();
    getPostsCount();
    getAllPosts(page);
  }, [page]);

  // Pagination
  const renderPagination = () => {
    const nextPage = () => {
      setPage(page + 1);
    };

    const previousPage = () => {
      setPage(page - 1);
    };

    const prevDis = () => {
      if (page <= 1) return true;
    };

    const nextDis = () => {
      if (page >= Math.ceil(postsCount / 5)) return true;
    };
    return (
      <div className={classes.root}>
        <Box className={classes.pagination}>
          <IconButton
            onClick={previousPage}
            disabled={prevDis()}
            className={classes.paginationBtn}
          >
            <ChevronLeft />
          </IconButton>
          <Chip label={page} color='secondary' />
          <IconButton
            onClick={nextPage}
            disabled={nextDis()}
            className={classes.paginationBtn}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </div>
    );
  };

  // Get each post image
  const renderPostImage = (imagename) => {
    if (imagename.length === 0) {
      return <Skeleton variant='rect' width='100%' height={118} />;
    } else {
      return (
        <Box margin={1}>
          <img className={classes.img} src={"/images/" + imagename} />
        </Box>
      );
    }
  };

  // Max charachters lengh for description
  const limit = 250;

  const renderPosts = () => {
    if (loading && postsData.length === 0)
      return (
        <Box>
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
          <Box>
            <Skeleton variant='rect' width='100%' height={118} />
            <Skeleton />
            <Skeleton width='60%' />
          </Box>
        </Box>
      );
    else if (!loading && postsData.length === 0)
      return (
        <Box>
          <Skeleton variant='rect' width='100%' height={118} />
          <Skeleton />
          <Skeleton width='60%' />
        </Box>
      );
    else
      return postsData.map((post, index) => {
        return (
          <Box key={index} margin={2}>
            <Paper elevation={3}>
              <Grid container className={classes.postView}>
                <Grid item xs={12} sm={7}>
                  <Box margin={2}>
                    <Link className={classes.link} to={`posts/${post._id}`}>
                      <Typography variant='h6' paragraph color='textPrimary'>
                        {post.title}
                      </Typography>
                    </Link>
                    <Typography
                      variant='body2'
                      align='justify'
                      color='textSecondary'
                    >
                      {post.description.substring(0, limit) + "..."}
                    </Typography>
                  </Box>
                  <Box margin={2}>
                    {post.tags.map((tag, index) => {
                      return (
                        <Link
                          className={classes.link}
                          key={index}
                          to={`/posts/tags/${tag.label}`}
                        >
                          <Chip
                            icon={<LocalOffer />}
                            size='small'
                            color='secondary'
                            key={index}
                            className={classes.chip}
                            label={tag.label}
                          />
                        </Link>
                      );
                    })}
                  </Box>
                  <Box margin={2} className={classes.readMore}>
                    <Link className={classes.link} to={`posts/${post._id}`}>
                      <Button variant='contained' color='primary'>
                        ادامه مطلب
                      </Button>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                  {renderPostImage(post.image)}
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      });
  };
  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Box mt={2} mb={2}>
          <Paper>
            <Grid item xs={12}>
              <Search />
            </Grid>
            <Grid item xs={12}>
              {renderPosts()}
            </Grid>
            <Grid item xs={12}>
              {renderPagination()}
            </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postsData: state.postReducer.posts,
  loading: state.postReducer.loading,
  postsCount: state.postReducer.postsCount,
});

Posts.propTypes = {
  loading: PropTypes.bool,
  getAllPosts: PropTypes.func.isRequired,
  clearLastPost: PropTypes.func.isRequired,
  getPostsCount: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  postsData: PropTypes.array,
  clearPostsCount: PropTypes.func.isRequired,
  postsCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, {
  getAllPosts,
  clearLastPost,
  getPostsCount,
  clearPostsCount,
  clearPosts,
})(Posts);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment-jalaali";

// Actions
import {
  getPostsByUserId,
  clearLastPost,
  deletePost,
  getUserPostsCount,
  clearPostsCount,
  clearPosts,
  clearLastCreatePostData,
} from "./../../../actions/postsAction";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Chip,
  Button,
  Paper,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import {
  LocalOffer,
  ChevronRight,
  ChevronLeft,
  Delete,
} from "@material-ui/icons";

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
  deleteBtn: {
    backgroundColor: "#ff1744",
    color: "#FFF",
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#b2102f",
    },
  },
}));

const AdminPosts = ({
  getPostsByUserId,
  deletePost,
  clearLastPost,
  postsData,
  loading,
  user,
  getUserPostsCount,
  clearPostsCount,
  postsCount,
  clearPosts,
  clearLastCreatePostData,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  moment.loadPersian({ usePersianDigits: true });

  useEffect(() => {
    clearLastCreatePostData();
    clearLastPost();
    clearPosts();
    clearPostsCount();
    getUserPostsCount(_id);
    getPostsByUserId(_id, page);
  }, [page]);

  // user id
  const { _id } = user;

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

  // Delete post
  const removePost = (id, image) => {
    deletePost(id, image);
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
  const limit = 100;

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
        <Grid item xs={12}>
          <Box padding={3}>
            <Typography variant='h6' color='secondary'>
              شما هنوز هیچ مقاله ای منتشر نکرده اید.
            </Typography>
          </Box>
        </Grid>
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
                      <Typography
                        variant='subtitle1'
                        paragraph
                        color='textPrimary'
                      >
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
                  <Box margin={2}>
                    <Typography variant='caption'>
                      تاریخ انتشار : {moment(post.date).format("jYYYY/jM/jD")}
                    </Typography>
                  </Box>
                  <Box margin={2} className={classes.readMore}>
                    <Button
                      className={classes.deleteBtn}
                      startIcon={<Delete />}
                      variant='contained'
                      onClick={() => removePost(post._id, post.image)}
                    >
                      حذف
                    </Button>
                    <Link className={classes.link} to={`/posts/${post._id}`}>
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
      <Grid item xs={12}>
        <Box padding={3}>
          <Typography align='center' variant='h6' color='secondary' paragraph>
            مقالات شما
          </Typography>
          <Divider style={{ marginBottom: "5px" }} />
          <Typography variant='body2' color='textSecondary' paragraph>
            در این بخش مقالاتی که توسط شما انتشار یافته است را می توانید مشاهده
            و در صورت تمایل حذف کنید.
          </Typography>
        </Box>
        <Divider />
        {renderPosts()}
      </Grid>
      <Grid item xs={12}>
        {renderPagination()}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postsData: state.postReducer.userPosts,
  loading: state.postReducer.loading,
  user: state.authReducer.user,
  postsCount: state.postReducer.postsCount,
});

AdminPosts.propTypes = {
  loading: PropTypes.bool,
  getPostsByUserId: PropTypes.func.isRequired,
  deletePost: PropTypes.func,
  clearLastPost: PropTypes.func.isRequired,
  getUserPostsCount: PropTypes.func.isRequired,
  postsData: PropTypes.array,
  clearPosts: PropTypes.func.isRequired,
  clearPostsCount: PropTypes.func.isRequired,
  postsCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getPostsByUserId,
  clearLastPost,
  deletePost,
  getUserPostsCount,
  clearPostsCount,
  clearPosts,
  clearLastCreatePostData,
})(AdminPosts);

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PropTypes from "prop-types";

// Actions
import { getPostById } from "./../../actions/postsAction";
import { clearLastProfile } from "./../../actions/profileAction";

// Components
import PostAuthor from "./postAuthor";
import Comment from "./comment";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Chip,
  Container,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { LocalOffer } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    verticalAlign: "middle",
  },
  link: {
    textDecoration: "none",
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  text: {
    whiteSpace: "pre-line",
  },
  chip: {
    margin: theme.spacing(0.5),
    cursor: "pointer",
  },
  code: {
    flip: false,
    textAlign: "left",
    direction: "ltr",
    fontSize: 16,
  },
}));

const Post = ({ clearLastProfile, getPostById, postData, loading, match }) => {
  const classes = useStyles();
  useEffect(() => {
    clearLastProfile();
    getPostById(match.params.id);
  }, [getPostById]);

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

  // Render post content
  const renderPostContent = (contents) => {
    return contents.map((content, index) => {
      return (
        <Box padding={3} key={index}>
          <Typography variant='h5' paragraph>
            {content.subtitle}
          </Typography>
          <Typography variant='body1' align='justify' className={classes.text}>
            {content.text}
          </Typography>
          <SyntaxHighlighter
            className={classes.code}
            language='javascript'
            style={atomOneDarkReasonable}
          >
            {content.code}
          </SyntaxHighlighter>
        </Box>
      );
    });
  };

  const renderPost = () => {
    if (loading || postData == null)
      return (
        <Box>
          <Skeleton variant='rect' width='100%' height={118} />
          <Skeleton />
          <Skeleton width='60%' />
        </Box>
      );
    return (
      <Box mt={2}>
        <Grid item xs={12}>
          <Box padding={3}>
            <Typography variant='h5'>{postData.title}</Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <PostAuthor author={postData} />
          </Box>
          <Box>{renderPostImage(postData.image)}</Box>
          <Box padding={3}>
            <Typography
              variant='body1'
              align='justify'
              className={classes.text}
            >
              {postData.description}
            </Typography>
          </Box>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <Box>{renderPostContent(postData.content)}</Box>
          <Box padding={3}>
            {postData.tags.map((tag, index) => {
              return (
                <Link
                  className={classes.link}
                  key={index}
                  to={`/posts/tags/${tag.label}`}
                >
                  <Chip
                    icon={<LocalOffer />}
                    color='secondary'
                    key={index}
                    className={classes.chip}
                    label={tag.label}
                  />
                </Link>
              );
            })}
          </Box>
          <Divider className={classes.divider} />
          <Box>
            <Comment post={postData} />
          </Box>
        </Grid>
      </Box>
    );
  };
  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Paper>{renderPost()}</Paper>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  postData: state.postReducer.post,
  loading: state.postReducer.loading,
});

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  clearLastProfile: PropTypes.func.isRequired,
  postData: PropTypes.object,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, { getPostById, clearLastProfile })(
  Post
);

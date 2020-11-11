import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { searchPosts, clearSearchPosts } from "./../../actions/postsAction";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Typography,
  Divider,
  Chip,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  searchView: {
    paddingTop: theme.spacing(2),
    position: "relative",
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "100px",
    verticalAlign: "middle",
  },
  postsView: {
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    maxHeight: "400px",
    overflow: "auto",
    zIndex: "99",
  },
  search: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  paper: {
    backgroundColor: theme.palette.type === "light" ? "#eeeeee" : "#212121",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    paddingLeft: theme.spacing(1),
  },
  chip: {
    cursor: "pointer",
  },
}));

// Search Component
const Search = ({ searchPosts, clearSearchPosts, postData }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  useEffect(() => {
    clearSearchPosts();
  }, []);

  const onChange = () => {
    if (text.length < 1 || text === " ") {
      clearSearchPosts();
    } else {
      searchPosts(text);
    }
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

  const renderPosts = (posts) => {
    if (posts.length === 0) return null;
    else
      return posts.map((post, index) => {
        return (
          <Link className={classes.link} key={index} to={`/posts/${post._id}`}>
            <Paper className={classes.paper} elevation={0} square>
              <Box className={classes.search}>
                <Grid item xs={6}>
                  {renderPostImage(post.image)}
                </Grid>
                <Grid item xs={6} className={classes.title}>
                  <Typography variant='subtitle2'>{post.title}</Typography>
                  {post.tags.slice(0, 1).map((tag, index) => {
                    return (
                      <Chip
                        icon={<LocalOfferIcon />}
                        size='small'
                        color='secondary'
                        key={index}
                        className={classes.chip}
                        label={tag.label}
                      />
                    );
                  })}
                </Grid>
              </Box>
              <Divider />
            </Paper>
          </Link>
        );
      });
  };

  return (
    <Box margin={2}>
      <Grid item xs={12} sm={5} className={classes.searchView}>
        <TextField
          size='small'
          fullWidth
          label='جستجو'
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={() => onChange()}
        />
        <Grid className={classes.postsView}>{renderPosts(postData)}</Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  postData: state.postReducer.searchedPosts,
});

Search.propTypes = {
  searchPosts: PropTypes.func.isRequired,
  clearSearchPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { searchPosts, clearSearchPosts })(
  Search
);

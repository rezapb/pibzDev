import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import PropTypes from "prop-types";

// Utils
import options from "../../../util/createPostTags";

// Components
import Overlay from "./overlay";

// Actions
import { createPost } from "../../../actions/postsAction";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Paper,
  IconButton,
} from "@material-ui/core";
import { Add, Delete, Save, CloudUpload } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  code: {
    flip: false,
    textAlign: "left",
    direction: "ltr",
    fontSize: 14,
  },
  tags: {
    zIndex: "99",
    "& *": {
      color: "#000",
    },
  },
  btn: {
    backgroundColor: "#e91e63",
    color: "#FFF",
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#c2185b",
      color: "#FFF",
    },
  },
}));

const PostContent = ({ createPost, imageName, uploaded, history }) => {
  const classes = useStyles();

  // Get imgId from store when updated
  useEffect(() => {
    setPostData({ ...postData, image: !uploaded ? "" : imageName });
  }, [uploaded]);

  // Set initial state for post
  const [postData, setPostData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    content: [],
  });

  // Set initial state for post content data
  const { title, description, content } = postData;

  const [bodyContent, setbodyContent] = useState([
    { subtitle: "", text: "", code: "" },
  ]);

  // Tags multi-select
  const [selectedOption, setSelectedOption] = useState(null);

  const setTags = (selectedOptions) => {
    setSelectedOption(selectedOptions);
    setPostData({ ...postData, tags: selectedOptions });
  };

  // Add button for post content
  const handleAddClick = () => {
    setbodyContent([...bodyContent, { subtitle: "", text: "", code: "" }]);
  };

  // Remove button for post content
  const handleRemoveClick = (index) => {
    const list = [...bodyContent];
    list.splice(index, 1);
    setbodyContent(list);
  };

  // Post content input change
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...bodyContent];
    list[index][name] = value;
    setbodyContent(list);
  };

  // Submit post content to post initial state
  const submitContent = () => {
    setPostData({ ...postData, content: content.concat(bodyContent) });
  };

  // Post input change
  const onChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  // Disable submit button till all neccessary fields are filled
  const disabelBtn = () => {
    return title === "" || description === "" || content.length <= 0
      ? true
      : false;
  };

  // Submit post data
  const onSubmit = (e) => {
    e.preventDefault();
    createPost(postData, history);
  };

  return (
    <div className={classes.root}>
      <Box padding={3} style={{ position: "relative" }}>
        <Overlay data={uploaded} />
        <Box>
          <Typography variant='h6' color='secondary' paragraph>
            ساخت محتوای مقاله
          </Typography>
          <Divider />
          <Typography variant='caption' color='textSecondary' paragraph>
            (فیلدهای اجباری *)
          </Typography>
        </Box>
        <Box>
          <form className={"post-form"} onSubmit={(e) => onSubmit(e)}>
            <Box>
              <Box margin={1}>
                <TextField
                  multiline
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  placeholder='عنوان اصلی'
                  label='عنوان مقاله'
                  name='title'
                  color='secondary'
                  value={title}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box margin={1}>
                <TextField
                  multiline
                  fullWidth
                  required
                  variant='outlined'
                  type='text'
                  color='secondary'
                  placeholder='توضیح'
                  label='توضیحات اولیه مقاله'
                  name='description'
                  value={description}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box margin={1}>
                <Select
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: "#e91e63",
                    },
                  })}
                  className={classes.tags}
                  placeholder='انتخاب دسته بندی'
                  onChange={setTags}
                  options={options}
                  isMulti={true}
                />
              </Box>
            </Box>
            <Box margin={1}>
              <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
              <Typography variant='subtitle1' color='secondary' paragraph>
                ساخت بدنه مقاله
              </Typography>
              <Divider style={{ marginBottom: "15px" }} />
              <Paper>
                {bodyContent.map((part, index) => {
                  return (
                    <Box padding={1} key={index}>
                      <Box margin={1}>
                        <TextField
                          size='small'
                          multiline
                          fullWidth
                          variant='filled'
                          type='text'
                          color='secondary'
                          placeholder='عنوان'
                          label='عنوان بخش'
                          name='subtitle'
                          value={part.subtitle}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Box>
                      <Box margin={1}>
                        <TextField
                          size='small'
                          multiline
                          fullWidth
                          variant='filled'
                          type='text'
                          color='secondary'
                          placeholder='متن'
                          label='متن بخش'
                          name='text'
                          value={part.text}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Box>
                      <Box margin={1}>
                        <TextField
                          size='small'
                          multiline
                          fullWidth
                          variant='filled'
                          type='text'
                          color='secondary'
                          placeholder='<Code />'
                          label='کد بخش'
                          name='code'
                          className={classes.code}
                          value={part.code}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </Box>
                      <Box margin={1}>
                        <Typography variant='caption' color='textSecondary'>
                          پیش نمایش کد
                        </Typography>
                        <SyntaxHighlighter
                          className={classes.code}
                          language='javascript'
                          style={monokaiSublime}
                        >
                          {part.code}
                        </SyntaxHighlighter>
                      </Box>
                      <Box margin={1}>
                        {bodyContent.length !== 1 && (
                          <IconButton
                            size='small'
                            className={classes.btn}
                            onClick={() => handleRemoveClick(index)}
                          >
                            <Delete />
                          </IconButton>
                        )}
                        {bodyContent.length - 1 === index && (
                          <IconButton
                            size='small'
                            className={classes.btn}
                            onClick={handleAddClick}
                          >
                            <Add />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  );
                })}
                <Box margin={1} padding={1}>
                  <Divider />
                  <Typography variant='caption' color='textSecondary' paragraph>
                    پس از اطمینان از محتوای بخش بدنه دکمه ثبت را بزنید
                  </Typography>
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<Save />}
                    onClick={submitContent}
                  >
                    ثبت
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box margin={1}>
              <Button
                color='secondary'
                variant='contained'
                startIcon={<CloudUpload />}
                type='submit'
                disabled={disabelBtn()}
              >
                ارسال
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  imageName: state.createPostReducer.imageName,
  uploaded: state.createPostReducer.uploaded,
});

PostContent.propTypes = {
  createPost: PropTypes.func,
  imageName: PropTypes.string,
  uploaded: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { createPost })(
  withRouter(PostContent)
);

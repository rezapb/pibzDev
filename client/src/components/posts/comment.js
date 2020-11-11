import React, { useState, useEffect, useRef, createRef } from "react";
import { connect, useSelector } from "react-redux";
import moment from "moment-jalaali";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Actions
import { postComment, postReply } from "./../../actions/postsAction";
import { alert } from "./../../actions/alertAction";

// Components
import PostAuthor from "./postAuthor";
import Alert from "./../alert/alert";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@material-ui/core";
import { Reply } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    width: "40px",
    height: "40px",
    border: "2px solid #212121",
    backgroundColor: " #bdbdbd",
    borderRadius: "50%",
    verticalAlign: "middle",
    marginLeft: "-1px",
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
    fontSize: 14,
  },
  accordion: {
    width: "100%",
  },
  replyView: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#2196f3",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  textPadding: {
    paddingLeft: theme.spacing(2),
    whiteSpace: "pre-line",
  },
  textIcon: {
    paddingLeft: theme.spacing(2),
    display: "flex",
  },
}));

// Comments Component
const Comment = ({
  post: { _id },
  comments,
  postComment,
  postReply,
  isAuth,
  alert,
}) => {
  const classes = useStyles();
  useEffect(() => {}, [comments]);
  const errors = useSelector((state) => state.alertReducer.errors);

  moment.loadPersian({ usePersianDigits: true });

  const textInput = useRef(comments.map(() => createRef()));
  const codeInput = useRef(comments.map(() => createRef()));

  const [replyText, setReplyText] = useState("");
  const [replyCode, setReplyCode] = useState("");

  const [commentContent, setCommentContent] = useState({
    cmText: "",
    cmCode: "",
  });

  const toggleReply = (index) => {
    document.getElementById(`reply-form${index}`).classList.toggle("hide");
  };

  const onChangeText = (index) => {
    setReplyText(textInput.current[index].current.value);
  };
  const onChangeCode = (index) => {
    setReplyCode(codeInput.current[index].current.value);
  };

  const cmOnChange = (e) => {
    setCommentContent({ ...commentContent, [e.target.name]: e.target.value });
  };

  const comment = (e) => {
    e.preventDefault();
    if (commentContent.cmText === "") {
      alert([{ msg: "متن پاسخ الزامی است", severity: "warning" }]);
    } else {
      postComment(_id, commentContent);
      setCommentContent({
        cmText: "",
        cmCode: "",
      });
    }
  };

  const reply = (e, commentId, index) => {
    e.preventDefault();
    if (replyText === "") {
      alert([{ msg: "متن پاسخ الزامی است", severity: "warning" }]);
    } else {
      postReply(_id, { commentId, replyText, replyCode });
      document.getElementById(`reply-form${index}`).reset();
      setReplyText("");
      setReplyCode("");
    }
  };

  const renderComments = (comments) => {
    if (comments.length === 0)
      return (
        <Grid item xs={12}>
          <Box mt={2} padding={3}>
            <Typography variant='subtitle1' color='secondary'>
              هنوز هیچ نظری برای این مقاله ثبت نشده است
            </Typography>
          </Box>
        </Grid>
      );
    else {
      return comments.map((comment, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Box mt={2} mb={2} padding={3}>
              <Paper elevation={3}>
                <Box mt={2} mb={2} padding={1}>
                  <Box>
                    <PostAuthor author={comment} />
                    <Box>
                      <Typography paragraph className={classes.textPadding}>
                        {comment.text}
                      </Typography>
                      {comment.code ? (
                        <SyntaxHighlighter
                          className={classes.code}
                          language='javascript'
                          style={atomOneDark}
                        >
                          {comment.code}
                        </SyntaxHighlighter>
                      ) : null}
                      <Divider className={classes.divider} />
                    </Box>
                  </Box>
                  <Box>
                    {comment.replies.lenght === 0 ? null : (
                      <Box>
                        {comment.replies.map((reply, index) => {
                          return (
                            <Box key={index}>
                              <PostAuthor author={reply} />
                              <Box>
                                <Box className={classes.textIcon}>
                                  <Reply />
                                  <Typography
                                    paragraph
                                    className={classes.text}
                                  >
                                    {reply.text}
                                  </Typography>
                                </Box>
                                {reply.code ? (
                                  <SyntaxHighlighter
                                    language='javascript'
                                    className={classes.code}
                                    style={atomOneDark}
                                  >
                                    {reply.code}
                                  </SyntaxHighlighter>
                                ) : null}
                                <Divider className={classes.divider} />
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                  <Grid item xs={12}>
                    <Box className={classes.accordion}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<Reply />}
                          aria-controls='panel1a-content'
                          id='panel1a-header'
                        >
                          <Typography variant='subtitle2' color='primary'>
                            پاسخ دهید
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordianDetails}>
                          {isAuth ? (
                            <Box className={classes.replyView}>
                              <form
                                className={classes.replyView}
                                id={`reply-form${index}`}
                                onSubmit={(e) => reply(e, comment._id, index)}
                              >
                                <Box margin={1}>
                                  <TextField
                                    inputRef={textInput.current[index]}
                                    multiline
                                    fullWidth
                                    variant='filled'
                                    label='پاسخ شما'
                                    placeholder='پاسخ'
                                    id='replyText'
                                    name='replyText'
                                    value={replyText}
                                    color='secondary'
                                    onChange={() => onChangeText(index)}
                                  />
                                </Box>
                                <Box margin={1}>
                                  <TextField
                                    className={classes.code}
                                    inputRef={codeInput.current[index]}
                                    multiline
                                    fullWidth
                                    variant='filled'
                                    label='کد'
                                    placeholder='<Code />'
                                    id='replyCode'
                                    name='replyCode'
                                    value={replyCode}
                                    color='secondary'
                                    onChange={() => onChangeCode(index)}
                                  />
                                </Box>
                                <Box ml={1}>
                                  <Button
                                    type='submit'
                                    variant='contained'
                                    className={classes.submit}
                                  >
                                    پاسخ
                                  </Button>
                                </Box>
                              </form>
                            </Box>
                          ) : (
                            <Typography>ابتدا عضو شوید</Typography>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Grid>
        );
      });
    }
  };
  return (
    <div className={classes.root}>
      <Alert errors={errors} />
      <Grid item xs={12}>
        {renderComments(comments)}
        <Box mb={2} padding={3}>
          <Paper elevation={3}>
            <Box mt={2} mb={2} padding={1}>
              {isAuth ? (
                <Box>
                  <Typography variant='h6' color='secondary' paragraph>
                    نظر خود را به اشتراک بگذارید
                  </Typography>
                  <form onSubmit={(e) => comment(e)}>
                    <Box margin={1}>
                      <TextField
                        multiline
                        fullWidth
                        variant='filled'
                        label='پاسخ شما'
                        placeholder='پاسخ'
                        id='cmText'
                        name='cmText'
                        color='secondary'
                        value={commentContent.cmText}
                        onChange={(e) => cmOnChange(e)}
                      />
                    </Box>
                    <Box margin={1}>
                      <TextField
                        variant='filled'
                        label='کد'
                        placeholder='<Code />'
                        id='cmCode'
                        name='cmCode'
                        color='secondary'
                        multiline
                        fullWidth
                        className={classes.code}
                        value={commentContent.cmCode}
                        onChange={(e) => cmOnChange(e)}
                      />
                    </Box>
                    <Box margin={1}>
                      <Button
                        type='submit'
                        variant='contained'
                        className={classes.submit}
                      >
                        پاسخ
                      </Button>
                    </Box>
                  </form>
                </Box>
              ) : (
                <Typography>ابتدا عضو شوید</Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.postReducer.post.comments,
  isAuth: state.authReducer.isAuth,
});

Comment.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array,
  postComment: PropTypes.func,
  postReply: PropTypes.func,
  isAuth: PropTypes.bool,
  alert: PropTypes.func,
};

export default connect(mapStateToProps, { postComment, postReply, alert })(
  Comment
);

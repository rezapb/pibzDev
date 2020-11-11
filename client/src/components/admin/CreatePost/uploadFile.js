import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { postImage } from "../../../actions/postsAction";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const UploadFile = ({ postImage }) => {
  const classes = useStyles();

  const [imgData, setImgData] = useState({ file: null });
  const [imgInfo, setImgName] = useState({
    imageName: "",
    imageDescription: "",
  });

  const uploadFile = (e) => {
    setImgData({ file: e.target.files[0] });
  };

  const { imageName, imageDescription } = imgInfo;
  const onChange = (e) => {
    setImgName({ ...imgInfo, [e.target.name]: e.target.value });
  };

  // Disable submit button till all fields are complete
  const disabelBtn = () => {
    return imgData.file === null ||
      imageName.length === 0 ||
      imageDescription.length === 0
      ? true
      : false;
  };

  // Show animation while uploading
  const [showUploading, setShowUploading] = useState(false);
  const uploadAnimation = () => {
    setShowUploading(true);
    setTimeout(() => {
      setShowUploading(false);
    }, 5000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postImage(imgData, imgInfo);
  };

  return (
    <div className={classes.root}>
      <Box>
        <Box padding={3}>
          <Typography variant='h6' color='secondary' paragraph>
            انتخاب تصویر مقاله
          </Typography>
          <Divider />
          <Typography variant='caption' color='textSecondary'>
            (فیلدهای اجباری*)
          </Typography>
        </Box>
        <Box pr={3} pl={3} pb={3}>
          <form encType='multipart/form-data' onSubmit={(e) => onSubmit(e)}>
            <Box margin={1}>
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                required
                placeholder='نام فایل'
                label='نام تصویر'
                id='imageName'
                name='imageName'
                color='secondary'
                value={imageName}
                onChange={(e) => onChange(e)}
              />
            </Box>
            <Box margin={1}>
              <TextField
                size='small'
                fullWidth
                variant='outlined'
                required
                label='توضیح کوتاه تصویر'
                placeholder='توضیح کوتاه فایل'
                name='imageDescription'
                color='secondary'
                value={imageDescription}
                onChange={(e) => onChange(e)}
              />
            </Box>
            <Box ml={1}>
              <label htmlFor='upload-photo'>
                <input
                  style={{ display: "none" }}
                  id='upload-photo'
                  name='upload-photo'
                  type='file'
                  onChange={(e) => uploadFile(e)}
                />
                <Button
                  component='span'
                  variant='contained'
                  color='secondary'
                  aria-label='add'
                >
                  <Add /> انتخاب تصویر
                </Button>
              </label>
            </Box>
            <Box margin={1}>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={disabelBtn()}
                onClick={() => {
                  uploadAnimation();
                }}
              >
                ارسال
              </Button>
            </Box>
            <Box
              className='profile-loading'
              style={{ display: showUploading ? "block" : "none" }}
            >
              <LinearProgress color='secondary' />
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({});

UploadFile.propTypes = {
  postImage: PropTypes.func,
};

export default connect(mapStateToProps, { postImage })(UploadFile);

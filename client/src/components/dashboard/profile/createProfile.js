import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Actions
import { editProfile } from "../../../actions/profileAction";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Box,
  Container,
  Paper,
  Divider,
  Select,
  Typography,
  Button,
  InputAdornment,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Instagram,
  Facebook,
  LinkedIn,
  Save,
  CancelScheduleSend,
} from "@material-ui/icons";

// Components
import AlertElem from "./../../alert/alert";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(3),
  },
  title: {
    padding: theme.spacing(2, 1),
  },
  formControl: {
    width: "100%",
  },
  submit: {
    backgroundColor: "#4caf50",
    margin: theme.spacing(1),
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#2e7d32",
    },
  },
  back: {
    backgroundColor: "#f44336",
    margin: theme.spacing(1),
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#c62828",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

// CreateProfile component
const CreateProfile = ({ editProfile, history }) => {
  const classes = useStyles();
  const [formData, setFromData] = useState({
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    instagram: "",
    facebook: "",
    linkedin: "",
  });

  // Deconstruct variables from FormData
  const {
    website,
    location,
    status,
    skills,
    bio,
    instagram,
    facebook,
    linkedin,
  } = formData;

  const onChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(formData, history);
  };

  // Get the errors from Store
  const errors = useSelector((state) => state.alertReducer.errors);

  return (
    <div className={classes.root}>
      <AlertElem errors={errors} />
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Grid item>
            <Typography
              variant='h5'
              color='secondary'
              className={classes.title}
            >
              ویرایش اطلاعات
            </Typography>
            <Divider />
            <Alert severity='info' color='info' size='small'>
              فیلدهایی که با علامت * نشان گذاری شده اند اجباری هستند.
            </Alert>
          </Grid>
          <Box mt={2} padding={2}>
            <form onSubmit={(e) => onSubmit(e)}>
              <Box>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    عنوان شغلی خود را انتخاب کنید.*
                  </InputLabel>
                  <Select
                    required
                    color='secondary'
                    fullWidth
                    name={"status"}
                    labelId='demo-simple-select-filled-label'
                    id='demo-simple-select-filled-label'
                    label='عنوان شغلی خود را انتخاب کنید.*'
                    value={status}
                    onChange={(e) => onChange(e)}
                  >
                    <MenuItem value={"Web Designer"}>Web Designer</MenuItem>
                    <MenuItem value={"UI/UX Designer"}>UI/UX Designer</MenuItem>
                    <MenuItem value={"Front-end Developer"}>
                      Front-end Developer
                    </MenuItem>
                    <MenuItem value={"Back-end Developer"}>
                      Back-end Developer
                    </MenuItem>
                    <MenuItem value={"Full Stack Developer"}>
                      Full Stack Developer
                    </MenuItem>
                    <MenuItem value={"SEO Consultant"}>SEO Consultant</MenuItem>
                    <MenuItem value={"Social Media Manager"}>
                      Social Media Manager
                    </MenuItem>
                    <MenuItem value={"Content Manager"}>
                      Content Manager
                    </MenuItem>
                    <MenuItem value={"Product Manager"}>
                      Product Manager
                    </MenuItem>
                  </Select>
                  <FormHelperText>
                    سمت کاری و سطحی که درحال حاضر در آن قرار دارید
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box>
                <TextField
                  variant='outlined'
                  value={website}
                  size='small'
                  margin='normal'
                  fullWidth
                  id='website'
                  label='وبسایت شخصی '
                  name='website'
                  color='secondary'
                  dir='ltr'
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box>
                <TextField
                  variant='outlined'
                  value={location}
                  size='small'
                  margin='normal'
                  fullWidth
                  id='location'
                  label='موقعیت مکانی '
                  name='location'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box>
                <TextField
                  variant='outlined'
                  size='small'
                  margin='normal'
                  fullWidth
                  id='skills'
                  placeholder='مثال : HTML, CSS, ...'
                  label='*توانایی ها'
                  name='skills'
                  color='secondary'
                  value={skills}
                  dir='ltr'
                  onChange={(e) => onChange(e)}
                />
                <FormHelperText>
                  توانایی های شما* - لطفا با "," از هم جدا کنید. مثال : HTML,
                  CSS
                </FormHelperText>
              </Box>
              <Box>
                <TextField
                  variant='outlined'
                  value={bio}
                  size='small'
                  margin='normal'
                  fullWidth
                  id='bio'
                  label='درباره من'
                  name='bio'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mt={3}>
                <Typography variant='h6' color='secondary'>
                  شبکه های اجتماعی
                </Typography>
                <Box>
                  <Input
                    variant='outlined'
                    fullWidth
                    color='secondary'
                    type={"text"}
                    placeholder={"اینستاگرام"}
                    name={"instagram"}
                    value={instagram}
                    onChange={(e) => onChange(e)}
                    id='input-with-icon-adornment'
                    startAdornment={
                      <InputAdornment position='start'>
                        <Instagram />
                      </InputAdornment>
                    }
                  />
                </Box>
                <Box>
                  <Input
                    variant='outlined'
                    fullWidth
                    color='secondary'
                    type={"text"}
                    placeholder={"فیسبوک"}
                    name={"facebook"}
                    value={facebook}
                    onChange={(e) => onChange(e)}
                    id='input-with-icon-adornment'
                    startAdornment={
                      <InputAdornment position='start'>
                        <Facebook />
                      </InputAdornment>
                    }
                  />
                </Box>
                <Box>
                  <Input
                    variant='outlined'
                    fullWidth
                    color='secondary'
                    type={"text"}
                    placeholder={"لینکداین"}
                    name={"linkedin"}
                    value={linkedin}
                    onChange={(e) => onChange(e)}
                    id='input-with-icon-adornment'
                    startAdornment={
                      <InputAdornment position='start'>
                        <LinkedIn />
                      </InputAdornment>
                    }
                  />
                </Box>
              </Box>
              <Box mt={4} mb={4}>
                <Link to={"/dashboard"} className={classes.link}>
                  <Button
                    startIcon={<CancelScheduleSend />}
                    className={classes.back}
                    variant='contained'
                  >
                    بازگشت
                  </Button>
                </Link>
                <Button
                  className={classes.submit}
                  type={"submit"}
                  startIcon={<Save />}
                >
                  ثبت
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

CreateProfile.propTypes = {
  editProfile: PropTypes.func,
};

export default connect(null, { editProfile })(withRouter(CreateProfile));

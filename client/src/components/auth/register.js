import React, { useState } from "react";
import { useSelector, connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Paper,
  Typography,
  Avatar,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";

// Actions
import { register } from "./../../actions/registerAction";
import { alert } from "./../../actions/alertAction";

// Components
import Alert from "./../alert/alert";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formRow: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#e91e63",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#d81b60",
    },
  },
  login: {
    color: theme.palette.type === "light" ? "#616161" : "#bdbdbd",
    // textDecoration: "none",
    fontWeight: "700",
  },
}));

// Copyright
const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <a
        style={{ color: "#e91e63", textDecoration: "none" }}
        href='https://www.Pibz.dev/'
      >
        www.Pibz.dev
      </a>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};

// Register component
const Register = ({ alert, register, isAuth }) => {
  const classes = useStyles();
  const errors = useSelector((state) => state.alertReducer.errors);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert([{ msg: "!تکرار رمز عبور مطابقت ندارد" }]);
    } else {
      register(formData);
    }
  };
  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className={classes.root}>
      <Alert errors={errors} />
      <Container maxWidth='sm'>
        <Paper>
          <Grid container className={classes.paper}>
            <Grid item xs={12} className={classes.row}>
              <Avatar className={classes.avatar}>
                <PersonAdd />
              </Avatar>
              <Typography component='h1' variant='h6'>
                ثبت نام
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.formRow}>
              <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
                <TextField
                  size='small'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='name'
                  label='نام و نام خانوادگی'
                  name='name'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  size='small'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='ایمیل'
                  name='email'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  size='small'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='نام کاربری'
                  name='username'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  size='small'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='رمز عبور'
                  type='password'
                  id='password'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
                <TextField
                  size='small'
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  name='confirmPassword'
                  label='تکرار رمز عبور'
                  type='password'
                  id='confirmPassword'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                >
                  ثبت نام
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.formRow}>
            <Box mt={2}>
              <Link to='/login' variant='body2' className={classes.login}>
                {"ثبت نام کرده اید؟ ورود "}
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={5} mb={2} pb={2}>
              <Copyright />
            </Box>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

Register.propTypes = {
  alert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps, { alert, register })(Register);

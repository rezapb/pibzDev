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
import { VpnKey } from "@material-ui/icons";

// Actions
import { login } from "./../../actions/loginAction";

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
  register: {
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

// Login component
const Login = ({ login, isAuth }) => {
  const classes = useStyles();
  // Get the errors from Store
  const errors = useSelector((state) => state.alertReducer.errors);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(formData);
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
                <VpnKey />
              </Avatar>
              <Typography component='h1' variant='h6'>
                ورود به سایت
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
                  name='password'
                  label='رمز عبور'
                  type='password'
                  id='password'
                  color='secondary'
                  onChange={(e) => onChange(e)}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                >
                  ورود
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.formRow}>
            <Box mt={2}>
              <Link to='/register' variant='body2' className={classes.register}>
                {"ثبت نام نکرده اید؟ ثبت نام کنید"}
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={5} pb={2}>
              <Copyright />
            </Box>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
});

export default connect(mapStateToProps, { login })(Login);

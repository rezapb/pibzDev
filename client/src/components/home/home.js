import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Images
import HomeImg from "./../../assets/images/home.jpg";
import HomeImg2 from "./../../assets/images/home2.jpg";

// Components
import Posts from "./../posts/posts";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
} from "@material-ui/core";
import { Person, Call } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    width: "100%",
    height: "auto",
  },
  imgView: {},
  title: {
    padding: theme.spacing(3),
  },
  btnView: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
  },
}));

//About Component
const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Box margin={2}>
        <Paper>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Box className={classes.title}>
                <Typography
                  style={{ fontWeight: 700 }}
                  variant='h5'
                  color='secondary'
                  paragraph
                >
                  باهم کد بزنیم!
                </Typography>
                <Typography variant='caption' color='textSecondary' paragraph>
                  یادگیری با همکاری و در کنار یکدیگر
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={classes.imgView}>
                <img
                  className={classes.img}
                  src={HomeImg}
                  alt='home main image'
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box margin={2}>
        <Grid item xs={12}>
          <Box padding={3}>
            <Typography variant='h6' color='secondary' paragraph>
              آخرین مقالات
            </Typography>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box padding={1}>
            <Posts />
          </Box>
        </Grid>
      </Box>
      <Box margin={2}>
        <Box padding={3}>
          <Typography variant='h6' color='secondary' paragraph>
            من کی ام؟ چجوری باهام در تماس باشی؟
          </Typography>
          <Divider />
        </Box>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <Box className={classes.btnView} padding={3}>
              <Link className={classes.link} to='/about'>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  className={classes.button}
                  startIcon={<Person />}
                >
                  درباره من
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box className={classes.btnView} padding={3}>
              <Link className={classes.link} to='/contact'>
                <Button
                  variant='contained'
                  color='secondary'
                  size='large'
                  className={classes.button}
                  startIcon={<Call />}
                >
                  تماس با من
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box margin={2}>
          <Paper>
            <Grid container>
              <Grid item sm={6} xs={12}>
                <Box className={classes.title}>
                  <Typography
                    style={{ fontWeight: 700 }}
                    variant='h5'
                    color='secondary'
                    paragraph
                  >
                    مشورت، آگاهی، انتقال تجربه
                  </Typography>
                  <Typography variant='caption' color='textSecondary' paragraph>
                    خب یادگیری اینجوریش خوبه دیگه!
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Box className={classes.imgView}>
                  <img
                    className={classes.img}
                    src={HomeImg2}
                    alt='home main image'
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

Home.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Home);

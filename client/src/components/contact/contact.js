import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import { Email, Call, LocationOn } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  contact: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    padding: theme.spacing(2),
  },
  border: {
    borderRight: "1px solid #eee",
  },
}));

//About Component
const Contact = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Box margin={2}>
        <Paper>
          <Grid container>
            <Grid item sm={5} xs={12}>
              <Typography
                className={classes.title}
                variant='h6'
                color='secondary'
                paragraph
              >
                راه های تماس با من
              </Typography>
              <Box>
                <Box padding={2} className={classes.contact}>
                  <Email fontSize='large' color='secondary' />
                  <Box pl={3}>
                    <Typography variant='body1' color='textPrimary'>
                      pibzdev@pibz.dev
                    </Typography>
                    <Typography variant='caption' color='textSecondary'>
                      ایمیل
                    </Typography>
                  </Box>
                </Box>
                <Box padding={2} className={classes.contact}>
                  <Call fontSize='large' color='secondary' />
                  <Box pl={3}>
                    <Typography variant='body1' color='textPrimary'>
                      09129518463
                    </Typography>
                    <Typography variant='caption' color='textSecondary'>
                      شماره همراه
                    </Typography>
                  </Box>
                </Box>
                <Box padding={2} className={classes.contact}>
                  <LocationOn fontSize='large' color='secondary' />
                  <Box pl={3}>
                    <Typography variant='body1' color='textPrimary'>
                      تهران، ایران
                    </Typography>
                    <Typography variant='caption' color='textSecondary'>
                      موقعیت جغرافیایی
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={7} xs={12}>
              <Typography
                className={classes.title}
                variant='h6'
                color='secondary'
                paragraph
              >
                تماس با من
              </Typography>
              <Box padding={3}>
                <Typography variant='caption' color='textSecondary' paragraph>
                  من به فرصت های آزاد و به ویژه پروژه های بلند پروازانه یا بزرگ
                  علاقه مندم. با این حال ، اگر درخواست یا سؤال دیگری دارید ،
                  دریغ نکنید با استفاده از فرم زیر نیز با من تماس بگیرید.
                </Typography>
                <form
                  action='mailto:pibzdev@pibz.dev'
                  method='POST'
                  encType='application/x-www-form-urlencoded'
                >
                  <TextField
                    margin='normal'
                    variant='outlined'
                    size='small'
                    fullWidth
                    color='secondary'
                    type='text'
                    name='name'
                    placeholder='نام'
                    label='نام شما'
                  />
                  <TextField
                    margin='normal'
                    variant='outlined'
                    size='small'
                    fullWidth
                    color='secondary'
                    type='text'
                    name='email'
                    placeholder='ایمیل'
                    label='ایمیل شما'
                  />
                  <TextField
                    margin='normal'
                    variant='outlined'
                    size='small'
                    fullWidth
                    color='secondary'
                    multiline
                    name='message'
                    placeholder='پیام'
                    rows='5'
                    label='پیام شما'
                  />
                  <Button type='submit' variant='contained' color='secondary'>
                    ارسال
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

Contact.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Contact);

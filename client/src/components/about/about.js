import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Signature
import Signature from "./../../assets/images/signature.png";
import Avatar from "./../../assets/images/avatar.png";

// Component
import TimeLine from "./timeLine";

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
import { Call } from "@material-ui/icons";

// Styles
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  img: {
    height: "auto",
    width: "80%",
  },
  border: {
    borderRight: "1px solid #eee",
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
  },
}));

//About Component
const About = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <Box margin={2}>
        <Paper>
          <Grid container>
            <Grid item sm={8} xs={12}>
              <Box padding={3} className={classes.border}>
                <Typography variant='h5' color='secondary' paragraph>
                  من، رضا پوربافرانی
                </Typography>
                <Typography variant='subtitle2' color='textSecondary' paragraph>
                  برنامه نویس و توسعه دهنده وب
                </Typography>
                <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
                <Typography
                  variant='body1'
                  color='textPrimary'
                  align='justify'
                  paragraph
                >
                  من رضا متولد ۱۳۷۵ الان بمدت ۴ سال میشود که دارم طراحی و برنامه
                  نویسی وب یادمیگیرم و در کنارش مشغول به کارهم هستم. سال ۱۳۹۴
                  کنکور ریاضی دادم و در دانشگاه علم و صنعت رشته ی صنایع قبول
                  شدم.
                  <br /> بعد از گذراندن چند ترم بدلیل مشکلاتی خاص و کمرنگ شدن
                  علاقم نسبت به رشته ی تحصیلیم با تغییر رشته وارد نرم افزار شدم
                  و درکنارش شروع کردم برنامه نویسی یاد بگیرم.
                  <br /> بدلیل عارضه قلبی و ریوی قادر به ادامه دانشگاه بصورت
                  حضوری نبودم و بیشتر تمرکزم را روی یادگیری برنامه نویسی وب و
                  تکنولوژی های مختلفش گذاشتم و روز به روز علاقه ام به این کار
                  افزایش می یابد. درکنار برنامه نویسی مشغول به تدریس زبان هستم.
                  دانش زبان خیلی توی این کار کمکم میکنه و یکی از نقاط قوت اصلیه
                  خودم میدونمش.
                  <br /> درحال یادگیری موسیقی سنتی ایرانی و ساز بی نظیره سنتور
                  هستم و به آرامش و تمرکزم توی کار خیلی کمک میکنه، از علایق
                  دیگرم خواندن کتاب و تماشای فیلم و سریال و مهم تراز همه بازی
                  کردن هست. حتما سعی میکنم بعدا بیشتر از خودم بگم فعلا برای الان
                  بسه...
                </Typography>
                <img className={classes.img} src={Signature} alt='signature' />
              </Box>
            </Grid>
            <Grid item sm={4} xs={12}>
              <Box padding={3} className={classes.avatar}>
                <img src={Avatar} alt='avatar' />
              </Box>
              <Divider />
              <Box padding={3} className={classes.avatar}>
                <Link className={classes.link} to='/contact'>
                  <Button
                    variant='contained'
                    color='secondary'
                    startIcon={<Call />}
                  >
                    تماس با من
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box margin={2}>
        <Paper>
          <Grid container>
            <Grid item xs={12}>
              <Box padding={3}>
                <Typography
                  variant='h5'
                  color='secondary'
                  paragraph
                  align='center'
                >
                  مسیر یادگیری من
                </Typography>
                <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
                <TimeLine />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

About.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(About);

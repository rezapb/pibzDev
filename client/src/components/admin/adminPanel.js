import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import AdminPosts from "./posts/adminPosts";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Container,
  Paper,
  Box,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import { Info } from "@material-ui/icons";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
  },
  info: {
    display: "flex",
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#e91e63",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#d81b60",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

// Dashboard component
const AdminPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth='md'>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paper}>
              <Box padding={2}>
                <Typography variant='h6' color='secondary' paragraph>
                  آموزش ساخت مقاله
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant='body1' color='textPrimary' paragraph>
                  لطفا قبل از نوشتن مقاله خود به نکات زیر توجه کنید.
                </Typography>
                <Box className={classes.info}>
                  <Info style={{ marginLeft: "5px" }} color='action' />
                  <Typography variant='body2' color='textSecondary' paragraph>
                    تصویر انتخابی برای مقاله با موضوع مقاله باید متناسب باشد.
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.info}>
                  <Info style={{ marginLeft: "5px" }} color='action' />
                  <Typography variant='body2' color='textSecondary' paragraph>
                    سعی شود حجم تصویر انتخابی کمتر از 2 مگابایت باشد.
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.info}>
                  <Info style={{ marginLeft: "5px" }} color='action' />
                  <Typography variant='body2' color='textSecondary' paragraph>
                    توضیح کوتاه تصویر باید با مفهوم عکس همخوانی داشته باشد.
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.info}>
                  <Info style={{ marginLeft: "5px" }} color='action' />
                  <Typography variant='body2' color='textSecondary' paragraph>
                    حداقل یک دسته بندی باید برای مقاله انتخاب شود، همچنین امکان
                    انتخاب چندین دسته بندی نیز امکان پذیر است.
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.info}>
                  <Info style={{ marginLeft: "5px" }} color='action' />
                  <Typography variant='body2' color='textSecondary' paragraph>
                    از صحت درست و اجرایی بودن کد برای بخش بدنه مقاله حتما
                    اطمینان حاصل فرمایید.
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Box className={classes.info}>
                  <Info style={{ marginLeft: "5px" }} color='action' />
                  <Typography variant='body2' color='textSecondary' paragraph>
                    در دسته بندی موضوعات و بخش های مختلف مقاله محدودیتی برای
                    تعداد بخش های بدنه وجود ندارد.
                  </Typography>
                </Box>
                <Divider className={classes.divider} />
                <Link className={classes.link} to='adminPanel/createPost'>
                  <Button fullWidth variant='contained' className={classes.btn}>
                    ساخت مقاله
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper className={classes.paper}>
              <AdminPosts />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(AdminPanel);

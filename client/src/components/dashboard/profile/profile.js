import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Grid,
  Box,
  CardMedia,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
} from "@material-ui/core";
import { Skeleton, Alert } from "@material-ui/lab";
import { ExpandMore, Instagram, Facebook, LinkedIn } from "@material-ui/icons";

// Actions
import { getProfile } from "./../../../actions/profileAction";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  imgView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      height: "150px",
      width: "150px",
      // border: "2px solid #212121",
      backgroundColor: "#bdbdbd",
      borderRadius: "50%",
    },
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    color: "#e91e63",
  },
  accordianDetails: {
    flexDirection: "column",
  },
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  website: {
    color: "#2196f3",
  },
  socialLinks: {
    color: "#2196f3",
    fontSize: 16,
  },
  profileSkills: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  btn: {
    backgroundColor: "#e91e63",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#d81b60",
    },
  },
  btnLink: {
    textDecoration: "none",
  },
  skeletView: {
    width: "100%",
  },
}));

const Profile = ({ userData, profileData, getProfile, loading }) => {
  useEffect(() => {
    getProfile();
  }, [loading]);
  const classes = useStyles();
  const { name, username, email, avatar } = userData;

  const renderProfile = () => {
    if (loading && profileData === null)
      return (
        <div className={classes.skeletView}>
          <Skeleton variant='rect' width='100%' height={118} />
          <Skeleton />
          <Skeleton width='60%' />
        </div>
      );
    else if (!loading && profileData === null)
      return (
        <Alert variant='filled' severity='warning'>
          پروفایلی برای این کابر هنوز وجود ندارد!
        </Alert>
      );
    else
      return (
        <div className={classes.root}>
          <Divider className={classes.divider} />
          <Typography className={classes.title}>وضعیت : </Typography>
          {profileData.status ? (
            <Typography variant='body2' component='p' paragraph>
              {profileData.status}
            </Typography>
          ) : (
            <Skeleton animation='wave' />
          )}
          <Typography className={classes.title}>وبسایت : </Typography>
          {profileData.website ? (
            <Typography variant='body2' component='p' paragraph>
              <a
                className={classes.website}
                href={"//" + profileData.website}
                target={"_blank"}
              >
                {profileData.website}
              </a>
            </Typography>
          ) : (
            <Skeleton animation='wave' />
          )}
          <Typography className={classes.title}>موقعیت : </Typography>
          {profileData.location ? (
            <Typography variant='body2' component='p' paragraph>
              {profileData.location}
            </Typography>
          ) : (
            <Skeleton animation='wave' />
          )}
          <Typography className={classes.title}>درباره من : </Typography>
          {profileData.bio ? (
            <Typography variant='body2' component='p' paragraph>
              {profileData.bio}
            </Typography>
          ) : (
            <Skeleton animation='wave' />
          )}
          <Typography className={classes.title}>توانایی ها : </Typography>
          <Box className={classes.profileSkills}>
            {profileData.skills ? (
              profileData.skills.map((skill, index) => {
                return (
                  <Chip key={index} className={classes.chip} label={skill} />
                );
              })
            ) : (
              <Skeleton animation='wave' />
            )}
          </Box>
          <Box>
            <Divider className={classes.divider} />
            <Typography className={classes.title}>
              شبکه های اجتماعی :{" "}
            </Typography>
            <Box mt={2}>
              <Avatar variant='rounded'>
                <Instagram color='secondary' />
              </Avatar>
              {profileData.socials.instagram ? (
                <Box mb={1} mt={1}>
                  <a
                    className={classes.socialLinks}
                    href={
                      "https://www.instagram.com/" +
                      profileData.socials.instagram
                    }
                    target={"_blank"}
                    rel='noopener noreferrer'
                  >
                    {profileData.socials.instagram}
                  </a>
                </Box>
              ) : (
                <Skeleton animation='wave' />
              )}
              <Avatar variant='rounded'>
                <Facebook color='secondary' />
              </Avatar>
              {profileData.socials.facebook ? (
                <Box mb={1} mt={1}>
                  <a
                    className={classes.socialLinks}
                    href={
                      "https://www.facebook.com/" + profileData.socials.facebook
                    }
                    target={"_blank"}
                    rel='noopener noreferrer'
                  >
                    {profileData.socials.facebook}
                  </a>
                </Box>
              ) : (
                <Skeleton animation='wave' />
              )}
              <Avatar variant='rounded'>
                <LinkedIn color='secondary' />
              </Avatar>

              {profileData.socials.linkedin ? (
                <Box mb={1} mt={1}>
                  <a
                    className={classes.socialLinks}
                    href={
                      "https://www.linkedin.com/in/" +
                      profileData.socials.linkedin
                    }
                    target={"_blank"}
                    rel='noopener noreferrer'
                  >
                    {profileData.socials.linkedin}
                  </a>
                </Box>
              ) : (
                <Skeleton animation='wave' />
              )}
            </Box>
          </Box>
        </div>
      );
  };

  const renderButton = () => {
    if (!loading && profileData === null)
      return (
        <Link className={classes.btnLink} to='dashboard/createProfile'>
          <Button className={classes.btn} fullWidth variant='contained'>
            ساخت پروفایل
          </Button>
        </Link>
      );
    else
      return (
        <Link className={classes.btnLink} to='dashboard/editProfile'>
          <Button className={classes.btn} fullWidth variant='contained'>
            ویرایش اطلاعات
          </Button>
        </Link>
      );
  };
  return (
    <div className={classes.root}>
      <Grid>
        <CardMedia className={classes.imgView}>
          <img src={avatar} alt={"Avatar"} />
        </CardMedia>
        <Divider />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={classes.title}>اطلاعات اصلی من</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordianDetails}>
            <Divider className={classes.divider} />
            <Typography className={classes.title}>نام : </Typography>
            <Typography variant='body2' component='p' paragraph>
              {name}
            </Typography>
            <Typography className={classes.title}>نام کاربری :</Typography>
            <Typography variant='body2' component='p' paragraph>
              {username}
            </Typography>
            <Typography className={classes.title}>ایمیل : </Typography>
            <Typography variant='body2' component='p' paragraph>
              {email}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={classes.title}>پروفایل من</Typography>
          </AccordionSummary>
          <AccordionDetails>{renderProfile()}</AccordionDetails>
        </Accordion>
        <div className={"profile-edit"}>{renderButton()}</div>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.authReducer.user,
  profileData: state.profileReducer.profile,
  loading: state.profileReducer.loading,
});

Profile.propTypes = {
  loading: PropTypes.bool,
  getProfile: PropTypes.func.isRequired,
  profileData: PropTypes.object,
  userData: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProfile })(Profile);

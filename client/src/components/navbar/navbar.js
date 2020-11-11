import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Links
import {
  guestsLinks,
  guestsLinksBottom,
  userLinks,
  userLinksBottom,
  adminLinks,
  adminLinksBottom,
} from "./links";

// Components
import MobileDrawer from "./mobileDrawer";

// Material UI
import {
  useMediaQuery,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  useScrollTrigger,
  Slide,
} from "@material-ui/core";
import { WbSunny, NightsStay } from "@material-ui/icons";
import { red, pink } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Actions
import { logout } from "./../../actions/logoutAction";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: "1",
  },
  appBar: {
    backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#212121",
  },
  navLink: {
    color: theme.palette.type === "light" ? "#212121" : "#f5f5f5",
    textDecoration: "none",
  },
  navParent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ulParentLinks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  ulParentButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  item: {
    padding: theme.spacing(1),
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  logOutButton: {
    color: "#FFF",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[600],
    },
  },
  logButton: {
    color: "#FFF",
    backgroundColor: pink[500],
    "&:hover": {
      backgroundColor: pink[600],
    },
  },
}));

const HideOnScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
};

// Navbar Component
const Navbar = ({
  isAuth,
  isVerified,
  logout,
  themeModeFunc,
  themeMode,
  props,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // Media query for mobile
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Dark mode
  const toggleTheme = () => {
    themeModeFunc(!themeMode);
  };

  // Render Links
  const renderLinks = (links) => {
    return (
      <Grid container className={classes.navParent}>
        <Grid item xs={10} className={classes.ulParentLinks}>
          {links.map((item, index) => {
            return (
              <Grid className={classes.item} key={index}>
                <Link className={classes.navLink} to={item.href}>
                  <Button>
                    <Typography variant='subtitle1'>{item.text}</Typography>
                  </Button>
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={2} className={classes.ulParentButtons}>
          <Grid className={classes.item}>
            <IconButton onClick={() => toggleTheme()}>
              {theme.palette.type === "light" ? <NightsStay /> : <WbSunny />}
            </IconButton>
          </Grid>
          {!isAuth ? (
            <Grid className={classes.item}>
              <Link className={classes.navLink} to='/login'>
                <Button variant='contained' className={classes.logButton}>
                  <Typography variant='subtitle1'>ورود</Typography>
                </Button>
              </Link>
            </Grid>
          ) : (
            <Grid className={classes.item}>
              <Link className={classes.navLink} to='/#' onClick={logout}>
                <Button variant='contained' className={classes.logOutButton}>
                  <Typography variant='subtitle1'>خروج</Typography>
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };

  const renderNav = () => {
    if (isAuth && !isVerified) {
      return renderLinks(userLinks, userLinksBottom);
    } else if (!isAuth) {
      return renderLinks(guestsLinks, guestsLinksBottom);
    } else if (isAuth && isVerified) {
      return renderLinks(adminLinks, adminLinksBottom);
    }
  };
  {
  }
  return !isMobile ? (
    <HideOnScroll {...props}>
      <AppBar className={classes.appBar} position='sticky'>
        <Container maxWidth='md'>
          <Toolbar>{renderNav()}</Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  ) : (
    <MobileDrawer themeModeFunc={themeModeFunc} themeMode={themeMode} />
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  isVerified: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  themeModeFunc: PropTypes.func.isRequired,
  themeMode: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth,
  isVerified: state.authReducer.verified,
});

export default connect(mapStateToProps, { logout })(Navbar);

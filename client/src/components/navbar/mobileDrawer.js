import React, { useState } from "react";
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

// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  SwipeableDrawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Hidden,
  Divider,
} from "@material-ui/core";
import { WbSunny, NightsStay, Menu } from "@material-ui/icons";

// Actions
import { logout } from "./../../actions/logoutAction";

// Styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.type === "light" ? "#f5f5f5" : "#212121",
  },
  navLink: {
    color: theme.palette.type === "light" ? "#212121" : "#f5f5f5",
    textDecoration: "none",
  },
  list: {
    width: 250,
  },
  listText: {
    // textAlign: "right",
  },
  title: {
    flexGrow: 1,
  },
}));

// Mobile drawer Component
const MobileDrawer = ({
  isAuth,
  isVerified,
  logout,
  themeModeFunc,
  themeMode,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setMobileOpen(false);
  };

  //log out
  const logOut = () => {
    logout();
    handleClose();
  };

  // Dark mode
  const toggleTheme = () => {
    themeModeFunc(!themeMode);
  };

  // Render links
  const renderLinks = (links, linksBottom) => {
    return (
      <div>
        <List className={classes.list}>
          {links.map((item, index) => {
            return (
              <Link
                key={index}
                className={classes.navLink}
                to={item.href}
                onClick={() => handleClose()}
              >
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    className={classes.listText}
                    primary={item.text}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
        <Divider />
        <List className={classes.list}>
          {linksBottom.map((item, index) => {
            return (
              <Link
                key={index}
                className={classes.navLink}
                to={item.href}
                onClick={() => (item.href === "/#" ? logOut() : handleClose())}
              >
                <ListItem button>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    className={classes.listText}
                    primary={item.text}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </div>
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
  return (
    <AppBar className={classes.appBar} position='sticky'>
      <Toolbar>
        <IconButton onClick={() => handleDrawerToggle()}>
          <Menu />
        </IconButton>
        <Typography variant='h6' className={classes.title}></Typography>
        <IconButton onClick={() => toggleTheme()}>
          {theme.palette.type === "light" ? <NightsStay /> : <WbSunny />}
        </IconButton>
      </Toolbar>
      <Hidden smUp implementation='css'>
        <SwipeableDrawer
          anchor='left'
          open={mobileOpen}
          onClose={() => handleDrawerToggle()}
          onOpen={() => handleDrawerToggle()}
        >
          {renderNav()}
        </SwipeableDrawer>
      </Hidden>
    </AppBar>
  );
};

MobileDrawer.propTypes = {
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

export default connect(mapStateToProps, { logout })(MobileDrawer);

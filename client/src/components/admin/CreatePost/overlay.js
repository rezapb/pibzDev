import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";

// Styles
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    zIndex: "999",
    cursor: " not-allowed",
    transition: " all linear 0.2s",

    "& div": {
      display: "flex",
      padding: "15px",
      borderRadius: "15px",
      background: "#f44336",
      "& h4": {
        marginBottom: " 0px !important",
        marginTop: " 0px !important",
        color: " #ffffff",
      },
    },
  },
}));

const Overlay = ({ data }) => {
  const classes = useStyles();
  return !data ? (
    <div className={classes.overlay}>
      <div>
        <h4>ابتدا تصویر را آپلود کنید!</h4>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Overlay;

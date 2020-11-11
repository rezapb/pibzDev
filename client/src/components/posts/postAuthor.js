import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment-jalaali";
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";

// Styles
const useStyles = makeStyles((theme) => ({
  img: {
    width: "40px",
    height: "40px",
    border: "2px solid #212121",
    backgroundColor: " #bdbdbd",
    borderRadius: "50%",
    verticalAlign: "middle",
    marginLeft: "-1px",
  },
  link: {
    textDecoration: "none",
    color: "#e91e63",
    fontSize: 13,
    fontWeight: 600,
  },
  date: {
    color: "#000",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  author: {
    display: "flex",
    alignItems: "center",
    borderRadius: " 50px",
    backgroundColor: " #EEEEEE",
    margin: theme.spacing(1),
  },
}));

const PostAuthor = ({ author }) => {
  const classes = useStyles();
  moment.loadPersian({ usePersianDigits: true });
  return (
    <Grid item sm={3} xs={12} className={classes.author}>
      <Box>
        <img src={`${author.avatar}`} className={classes.img} />
      </Box>
      <Box padding={1}>
        <Link className={classes.link} to={`/profiles/${author.user}`}>
          {author.username}
        </Link>
      </Box>
      <Box padding={1}>
        <Typography variant='body2' className={classes.date}>
          {moment(author.date).format("jYYYY/jM/jD")}
        </Typography>
      </Box>
    </Grid>
  );
};

PostAuthor.propTypes = {
  author: PropTypes.object,
};

export default connect()(PostAuthor);

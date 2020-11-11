import React from "react";
import { connect } from "react-redux";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@material-ui/lab";

// Styles
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
}));

const TimeLine = () => {
  const classes = useStyles();
  return (
    <Timeline align='alternate'>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='secondary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>HTML, CSS</Typography>
            <Typography variant='caption' color='textSecondary'>
              ابتدا یادگیری مباحث پایه
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='primary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>Javascript</Typography>
            <Typography variant='caption' color='textSecondary'>
              یادگیری زبان برنامه نویسی
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='secondary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>Git, Github</Typography>
            <Typography variant='caption' color='textSecondary'>
              آشنایی با سیستم های کنترل ورژن
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='primary' />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>Package Managers</Typography>
            <Typography variant='caption' color='textSecondary'>
              آشنایی با npm و yarn
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='secondary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>CSS Preprocessor</Typography>
            <Typography variant='caption' color='textSecondary'>
              یادگیری Sass
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='primary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>React</Typography>
            <Typography variant='caption' color='textSecondary'>
              یادگیری فریمورک React
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='secondary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>CSS Framework</Typography>
            <Typography variant='caption' color='textSecondary'>
              آشنایی با فریمورک های Bootstrap و Material UI
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='primary' />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>React Native</Typography>
            <Typography variant='caption' color='textSecondary'>
              آشنایی با فریمورک React-Native برای موبایل اپلیکیشن
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='secondary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>Back-end</Typography>
            <Typography variant='caption' color='textSecondary'>
              یادگیری مفاهیم اولیه بک اند
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='primary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>NodeJs</Typography>
            <Typography variant='caption' color='textSecondary'>
              آشنایی با nodejs
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='secondary' />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>NoSQL Database</Typography>
            <Typography variant='caption' color='textSecondary'>
              یادگیری و کار با MongoDB
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot variant='outlined' color='primary' />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant='subtitle1'>Express</Typography>
            <Typography variant='caption' color='textSecondary'>
              آشنایی با فریمورک Express.js
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TimeLine);

import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { useRowFlexStyles } from "@mui-treasury/styles/flex/row";
import Moment from "react-moment";
import "moment-timezone";
import { useHistory, withRouter } from "react-router-dom";

//css styles
const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 16,
    backgroundColor: palette.grey[200],
    width: "85%",
  },
  content: {
    padding: spacing(0, 2, 0, 0),
    width: "100%",
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block",
  },
  body: {
    fontSize: 14,
    color: palette.grey[500],
  },
  divider: {
    margin: spacing(1, 0),
  },
  textFooter: {
    fontSize: 14,
    borderRadius: "10px",
    paddingLeft: 0,
  },
  icon: {
    fontSize: "1.2rem",
    verticalAlign: "bottom",
  },
  doubtbox: {
    padding: "15px 0",
    height: "auto",
    borderRadius: 16,
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },

  postbox: {
    display: "flex",
    width: "100%",
  },
  date: {
    marginLeft: "auto",
  },
  box: {
    padding: "15px 0",
    height: "auto",
    borderRadius: 16,
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    alignItems: "center",
  },
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 16,
    backgroundColor: palette.grey[200],
    width: "85%",
  },
}));

const CommentCard = (props) => {
  const styles = useStyles();
  //comment card
  return (
    <div>
      <Box className={styles.box}>
        <Card className={styles.card}>
          <CardContent className={styles.content}>
            <Box mb={1} className={styles.postbox}>
              <h3 className={styles.heading}>{props.comments.user.username}</h3>
              <h4 className={styles.date}>
                {" "}
                <Moment format="HH:MM DD/MM/YYYY">
                  {props.comments.createdAt}
                </Moment>
              </h4>
            </Box>

            <p className={styles.body}>{props.comments.content}</p>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default CommentCard;

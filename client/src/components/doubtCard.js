import { IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useRowFlexStyles } from "@mui-treasury/styles/flex/row";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { ArrowForwardIos, ThumbDown, ThumbUp } from "@mui/icons-material";
import axios from "axios";
import cx from "clsx";
import "moment-timezone";
import React, { useState } from "react";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";

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
}));

export const DoubtCard = (props) => {
  const history = useHistory();
  const styles = useStyles();
  const gutterStyles = usePushingGutterStyles({ space: 1.5 });
  const labelStyles = useLabelIconStyles({ linked: true });
  const flexStyles = useRowFlexStyles();

  //store button states
  const [incButton, setIncButton] = useState({
    state: props.doubts.upvoteState,
    count: props.doubts.upvoteCount,
  });
  const [decButton, setDecButton] = useState({
    state: props.doubts.downvoteState,
    count: props.doubts.downvoteCount,
  });

  const incVote = async () => {
    await props.getDoubts();
  };

  const decVote = async () => {
    await props.getDoubts();
  };

  //called when upvoted
  const incrementVote = async (param) => {
    if (incButton.state) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/doubts/${props.doubts.id}/upvoteDecrement`
        );
        setIncButton((previousState) => {
          return { ...previousState, state: false };
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/doubts/${props.doubts.id}/upvoteIncrement`
        );

        if (decButton.state) {
          const response1 = await axios.put(
            `http://localhost:5000/api/doubts/${props.doubts.id}/downvoteDecrement`
          );
        }

        setIncButton((previousState) => {
          return { ...previousState, state: true };
        });
        setDecButton((previousState) => {
          return { ...previousState, state: false };
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  //called when downvoted
  const decrementVote = async (param) => {
    if (decButton.state) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/doubts/${props.doubts.id}/downvoteDecrement`
        );
        setDecButton((previousState) => {
          return { ...previousState, state: false };
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/doubts/${props.doubts.id}/downvoteIncrement`
        );
        if (incButton.state) {
          const response1 = await axios.put(
            `http://localhost:5000/api/doubts/${props.doubts.id}/upvoteDecrement`
          );
        }
        setIncButton((previousState) => {
          return { ...previousState, state: false };
        });
        setDecButton((previousState) => {
          return { ...previousState, state: true };
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box className={styles.doubtbox}>
      <Card className={styles.card} elevation={0}>
        <CardContent className={styles.content}>
          <Box mb={1} className={styles.postbox}>
            <h3 className={styles.heading}>{props.doubts.user.username} </h3>
            <h4 className={styles.date}>
              {" "}
              <Moment format="HH:MM DD/MM/YYYY">
                {props.doubts.createdAt}
              </Moment>
            </h4>
          </Box>
          <h3 className={styles.heading}>{props.doubts.title} </h3>
          <p className={styles.body}>{props.doubts.content}</p>
          <Divider className={styles.divider} light />
          <div className={flexStyles.parent}>
            <IconButton
              className={cx(labelStyles.primaryLink, styles.textFooter)}
              onClick={() =>
                history.replace({
                  pathname: `/subjectPage/doubts/${props.doubts.user.username}/${props.doubts.title}`,
                  query: { detail: props },
                })
              }
            >
              Comments
              <ArrowForwardIos className={labelStyles.icon} />
            </IconButton>
            <div
              className={cx(
                flexStyles.rightChild,
                flexStyles.parent,
                gutterStyles.parent
              )}
            >
              <button type={"button"} className={labelStyles.link}>
                <ThumbUp
                  color={incButton.state ? "primary" : "default"}
                  onClick={async () => {
                    await incrementVote();
                    incVote();
                  }}
                />
                {props.doubts.upvoteCount}
              </button>
              <button type={"button"} className={labelStyles.link}>
                <ThumbDown
                  color={decButton.state ? "primary" : "default"}
                  onClick={async () => {
                    await decrementVote();
                    decVote();
                  }}
                />{" "}
                {props.doubts.downvoteCount}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoubtCard;

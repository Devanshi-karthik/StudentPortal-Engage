import React, { useEffect, useState } from "react";
import DoubtCard from "../components/doubtCard";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { Alert, Card, CardContent, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DoubtPage = () => {
  const loc = useLocation();
  toast.configure();
  const [doubtData, setDoubtData] = useState([]);
  const [error, setError] = useState(null);
  const getDoubts = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/doubts/subject/${loc.state.detail.id}`)
        .then((response) => {
          //setDoubtData(response.data.data);
          response.data.data.sort((a, b) => b.upvoteCount - a.upvoteCount);
          setDoubtData(response.data.data);
        });

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    getDoubts();
  }, []);

  const newdoubtParam = {
    user: localStorage.getItem("userId"),
    title: "",
    content: "",
    subject: "",
  };

  const [postNewDoubt, setPostNewDoubt] = useState(newdoubtParam);

  const createDoubt = async (newDoubt) => {
    try {
      return await axios.post(`http://localhost:5000/api/doubts`, newDoubt);
    } catch (error) {
      console.log(error);
      toast.error("Please try again", { position: toast.POSITION.TOP_RIGHT });
    }
  };
  useEffect(() => {
    const userid = localStorage.getItem("userId");
    setPostNewDoubt({ ...postNewDoubt, ["user"]: userid });
    setPostNewDoubt({ ...postNewDoubt, ["subject"]: loc.state.detail.id });
  }, []);
  const postDoubt = async () => {
    let response = await createDoubt(postNewDoubt);

    if (response) {
      toast.success("Posted Doubt sucessfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      getDoubts();
    }
  };
  const onInputchange = (e) => {
    setPostNewDoubt({ ...postNewDoubt, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div>
        <Box
          sx={{
            paddingLeft: 15,
            paddingTop: 5,
            paddingRight: 15,
            height: "auto",
            width: "auto",
            backgroundColor: "grey",
          }}
        >
          <Card style={{ minHeight: 150, minWidth: 200, borderRadius: 3 }}>
            <CardContent>
              <Typography style={{ margin: 10 }}>Post a doubt!</Typography>
              <div style={{ margin: 10 }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Doubt title"
                  fullWidth
                  name="title"
                  onChange={(e) => {
                    onInputchange(e);
                  }}
                />
              </div>
              <div style={{ margin: 10 }}>
                <TextField
                  required
                  id="outlined-multiline-static"
                  label="Doubt Question"
                  multiline
                  rows={4}
                  fullWidth
                  name="content"
                  onChange={(e) => {
                    onInputchange(e);
                  }}
                />
              </div>
              <Box style={{ margin: 10 }}>
                <Button variant="outlined" onClick={() => postDoubt()}>
                  Post doubt
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>

      <div>
        {doubtData.map((doubt) => (
          <DoubtCard
            getDoubts={getDoubts}
            key={doubt.id}
            doubts={doubt}
          ></DoubtCard>
        ))}
      </div>
    </div>
  );
};

export default DoubtPage;

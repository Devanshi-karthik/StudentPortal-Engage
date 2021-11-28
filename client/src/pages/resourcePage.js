import { Card, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResourceCard from "../components/resourceCard";

const ResourcePage = () => {
  const loc = useLocation();
  toast.configure();
  const [resourceData, setResourceData] = useState([]);
  const getResources = async () => {
    try {
      await axios
        .get(
          `http://localhost:5000/api/resources/subject/${loc.state.detail.id}`
        )
        .then((response) => {
          response.data.data.sort((a, b) => b.upvoteCount - a.upvoteCount);
          setResourceData(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(async () => {
    getResources();
  }, []);

  const newresourceParam = {
    user: localStorage.getItem("userId"),
    title: "",
    description: "",
    link: "",
    subject: "",
  };

  const [newrepostNewResource, setPostNewResource] = useState(newresourceParam);

  const createResource = async (newResource) => {
    try {
      return await axios.post(
        `http://localhost:5000/api/resources`,
        newResource
      );
    } catch (error) {
      console.log(error);
      toast.error("Please try again", { position: toast.POSITION.TOP_RIGHT });
    }
  };
  useEffect(() => {
    const userid = localStorage.getItem("userId");
    setPostNewResource({ ...newrepostNewResource, ["user"]: userid });
    setPostNewResource({
      ...newrepostNewResource,
      ["subject"]: loc.state.detail.id,
    });
  }, []);
  const postResource = async () => {
    let response = await createResource(newrepostNewResource);
    if (response) {
      toast.success("Posted Resource sucessfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      getResources();
    }
  };
  const onInputchange = (e) => {
    setPostNewResource({
      ...newrepostNewResource,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div>
        <Box
          sx={{
            paddingLeft: 15,
            paddingTop: 5,
            paddingRight: 15,
            paddingBottom: 10,
            height: "auto",
            width: "auto",
            backgroundColor: "grey",
          }}
        >
          <Card style={{ minHeight: 150, minWidth: 200, borderRadius: 3 }}>
            <CardContent>
              <Typography style={{ margin: 10 }}>Post a resource!</Typography>
              <div style={{ margin: 10 }}>
                <TextField
                  required
                  id="outlined-required"
                  label="Resource title"
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
                  id="outlined-required"
                  label="Resource Link"
                  rows={4}
                  fullWidth
                  name="link"
                  onChange={(e) => {
                    onInputchange(e);
                  }}
                />
              </div>
              <div style={{ margin: 10 }}>
                <TextField
                  required
                  id="outlined-multiline-static"
                  label="Resource Description"
                  multiline
                  rows={4}
                  fullWidth
                  name="description"
                  onChange={(e) => {
                    onInputchange(e);
                  }}
                />
              </div>
              <Box style={{ margin: 10 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    postResource();
                  }}
                >
                  Post resource
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
      <div>
        {resourceData.map((resource) => (
          <ResourceCard
            getResources={getResources}
            key={resource.id}
            resources={resource}
          ></ResourceCard>
        ))}
      </div>
    </div>
  );
};

export default ResourcePage;

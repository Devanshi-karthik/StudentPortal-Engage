import React, { useState } from "react";
import Register from "./pages/register";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import Postpage from "./pages/postpage";
import SubjectPage from "./pages/SubjectPage";
import CommentPage from "./pages/commentPage";
import ResourceComment from "./pages/resourceComments";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            {" "}
            <Register user={user} setUser={setUser} />
          </Route>
          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/:subjectCode?/:page?"
            render={(props) => <SubjectPage {...props} />}
          />
          <Route path="/postpage/:id" component={Postpage} />
          <Route
            exact
            path="/subjectPage/doubts/:userName?/:title?"
            render={(props) => <CommentPage {...props} />}
          />
          <Route
            exact
            path="/subjectPage/resources/:userName?/:title?"
            render={(props) => <ResourceComment {...props} />}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;

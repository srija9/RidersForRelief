import React from "react";
import { Redirect, Route, Switch } from "react-router";
import FeedbackForm from "../feedback/feedbackForm";
import MyRequests from "./MyRequests";
import PlacedRequest from "./placed_request/placed_request";
const MyRequestsRoutes = () => {
  return (
    <Switch>
      <Route exact path="/my_requests/feedback">
        <FeedbackForm/>
      </Route>
      <Route
        path="/my_requests/:requestNumber"
        render={(match) => {
          if(!match.location.state) return <Redirect to='/my_requests' />
          return <PlacedRequest />;
        }}
      />
      <Route exact path="/my_requests">
        <MyRequests />
      </Route>
      
    </Switch>
  );
};

export default MyRequestsRoutes;

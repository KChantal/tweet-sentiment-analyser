import React, { Component } from "react";
import { withCookies } from "react-cookie";
import Main from "./components/Main";

import "./stylesheets/style.css";

const App = (props) => {
  return (
    <div>
      <Main cookies={props.cookies} />
    </div>
  );
};

export default withCookies(App);

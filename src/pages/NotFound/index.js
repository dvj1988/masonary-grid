import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div
          className="not-found"
          style={{
            paddingLeft: "30%"
          }}
        >
          <h2>404</h2>
          <h4>Page Not Found</h4>
          <Link to="/">Take me Home</Link>
        </div>
      </div>
    );
  }
}

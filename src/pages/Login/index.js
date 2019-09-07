import React, { Component } from "react";
import "./style.css";
class LoginPage extends Component {
  state = {
    email: {
      regEx: /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim,
      value: ""
    },
    password: {
      value: ""
    }
  };

  handleOnChange = ({ target: { value } }, field) => {
    this.setState({
      [field]: {
        ...this.state[field],
        value
      }
    });
  };

  handleFormSubmit = () => {
    if (this.isFormValid()) {
      localStorage.setItem("isLoggedIn", true);
      window.location = "/home";
    }
  };

  isFormValid = () => {
    const { email, password } = this.state;
    let isValid = true;

    const emailRegEx = new RegExp(email.regEx);
    if (!emailRegEx.test(email.value)) isValid = false;

    if (password.length < 5) isValid = false;

    return isValid;
  };

  render() {
    const {
      email: { value: email },
      password: { value: password }
    } = this.state;
    return (
      <div>
        <div className="login-form-wrapper">
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={e => this.handleOnChange(e, "email")}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              value={password}
              onChange={e => this.handleOnChange(e, "password")}
            />
          </div>
          <div className="action-wrapper">
            <button onClick={this.handleFormSubmit}>Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;

import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { Redirect, withRouter } from 'react-router';
import { Card, Typography, Button, Input } from 'components';
import { SignupPicture, FacebookPicture, LinkedinPicture, AloricaPicture } from 'assets/images';
import UserService from '../../services/userService';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      redirectToLogin: false,
    };
    this.validator = new SimpleReactValidator({
      className: 'text-danger',
      autoForceUpdate: this,
    });
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  registerUser = () => {
    if (this.validator.allValid()) {
      const { name, phoneNumber, email, password } = this.state;
      const userInformation = { name, phoneNumber, email, password };
      // show loader here
      UserService.registerNewUser(userInformation)
        .then(() =>
          this.props.history.push({
            pathname: '/',
            state: { isNewUser: true },
          })
        )
        .catch(error => toast.error(error.response.data.message));
    } else {
      this.validator.showMessages();
    }
  };

  routeToLoginPage = () => this.setState({ redirectToLogin: true });

  render() {
    if (this.state.redirectToLogin) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login">
        <img src={SignupPicture} alt="signup" className="login-picture" />
        <Card className="login-wrapper">
          <form>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              labelText="Name"
              placeholder="John Doe"
            />
            {this.validator.message('name', this.state.name, 'required|alpha_space')}

            <Input
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
              name="phoneNumber"
              labelText="Contact Number"
              placeholder="+639123456789"
            />
            {this.validator.message('phoneNumber', this.state.phoneNumber, 'required|phone')}

            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              type="email"
              name="email"
              labelText="Email"
              placeholder="john.doe@alorica.com"
            />
            {this.validator.message('email', this.state.email, 'required|email')}

            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              type="password"
              labelText="Password"
            />
            {this.validator.message('password', this.state.password, 'required|string')}

            <Button
              className="login-button"
              variant="inverted"
              type="button"
              onClick={this.registerUser}
            >
              Sign Up
            </Button>
            <Typography variant="subtitle" className="login-text">
              or connect with
            </Typography>
          </form>
          <div className="login-providers">
            <Button variant="inline">
              <img src={FacebookPicture} alt="facebook" />
            </Button>
            <Button variant="inline">
              <img src={LinkedinPicture} alt="linkedin" />
            </Button>
          </div>
          <div className="login-signup">
            <Typography>
              Already have an account?{' '}
              <Button variant="inline" onClick={this.routeToLoginPage}>
                Login.
              </Button>
            </Typography>
          </div>
        </Card>
        <img src={AloricaPicture} alt="alorica" className="login-logo" />
      </div>
    );
  }
}

export default withRouter(Signup);

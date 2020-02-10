import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
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
        .catch(error => toast.error(error.response.data.error));
    } else {
      this.validator.showMessages();
    }
  };

  render() {
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
            />
            {this.validator.message('name', this.state.name, 'required|alpha')}

            <Input
              value={this.state.phoneNumber}
              onChange={this.handleInputChange}
              name="phoneNumber"
              labelText="Contact Number"
            />
            {this.validator.message('phoneNumber', this.state.phoneNumber, 'required|alpha')}

            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              type="email"
              name="email"
              labelText="Email"
            />
            {this.validator.message('email', this.state.email, 'required')}

            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              labelText="Password"
            />
            {this.validator.message('password', this.state.password, 'required|alpha')}

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
              Already have an account? <Button variant="inline">Login.</Button>
            </Typography>
          </div>
        </Card>
        <img src={AloricaPicture} alt="alorica" className="login-logo" />
      </div>
    );
  }
}

export default withRouter(Signup);

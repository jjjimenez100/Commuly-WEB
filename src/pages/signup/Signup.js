import React, { Component } from 'react';
import { Card, Typography, Button, Input } from 'components';
import { SignupPicture, FacebookPicture, LinkedinPicture, AloricaPicture } from 'assets/images';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

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
            <Input
              value={this.state.email}
              onChange={this.handleInputChange}
              type="email"
              name="email"
              labelText="Email"
            />
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              labelText="Password"
            />
            <Button className="login-button" variant="inverted" type="submit">
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

export default Signup;

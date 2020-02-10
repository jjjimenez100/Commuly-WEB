import React, { Component } from 'react';
import { Card, Typography, Button, Input } from 'components';
import { toast } from 'react-toastify';
import { LoginPicture, FacebookPicture, LinkedinPicture, AloricaPicture } from 'assets/images';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount = () => {
    const { state } = this.props.location;
    if (state && state.isNewUser) {
      toast.success('Successfully registered! You can now login.');
      this.props.history.replace({
        pathname: this.props.location.pathname,
        state: {},
      });
    }
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="login">
        <img src={LoginPicture} alt="login" />
        <Card className="login-wrapper">
          <form>
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
              type="password"
            />
            <Button className="login-button" variant="inverted" type="submit">
              Login
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
              Don&apos;t have an account? <Button variant="inline">Sign up.</Button>
            </Typography>
          </div>
        </Card>
        <img src={AloricaPicture} alt="alorica" className="login-logo" />
      </div>
    );
  }
}

export default Login;

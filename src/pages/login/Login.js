import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import { Card, Typography, Button, Input } from 'components';
import { toast } from 'react-toastify';
import { LoginPicture, FacebookPicture, LinkedinPicture, AloricaPicture } from 'assets/images';
import { store as userStore } from '../../stores/user';

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirectToRegistration: false,
    redirectToDashboard: false,
  };

  componentDidMount = () => {
    const { state } = this.props.location;
    if (state && state.isNewUser) {
      toast.success('Successfully registered. You can now login.');
      this.props.history.replace({
        pathname: this.props.location.pathname,
        state: {},
      });
    }
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  routeToRegisterPage = () => this.setState({ redirectToRegistration: true });

  loginUser = () => {
    const { email, password } = this.state;
    const userCredentials = { email, password };
    // TODO: show loader
    userStore
      .loginUser(userCredentials)
      .then(response => {
        // TODO: get token, set to local storage, then store user data to central mobx
        if (response.status === 200) {
          const userInformation = { ...response.data };
          userStore.setUserInformation(userInformation);
          this.setState({
            redirectToDashboard: true,
          });
        }
      })
      .catch(e => toast.error(e.response.data.message));
  };

  render() {
    const { redirectToDashboard, redirectToRegistration } = this.state;

    if (redirectToRegistration) {
      return <Redirect to="/signup" />;
    }

    if (redirectToDashboard) {
      return <Redirect to="/dashboard" />;
    }

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
            <Button
              className="login-button"
              variant="inverted"
              type="button"
              onClick={this.loginUser}
            >
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
              Don&apos;t have an account?{' '}
              <Button variant="inline" onClick={this.routeToRegisterPage}>
                Sign up.
              </Button>
            </Typography>
          </div>
        </Card>
        <img src={AloricaPicture} alt="alorica" className="login-logo" />
      </div>
    );
  }
}

export default inject('store')(observer(Login));

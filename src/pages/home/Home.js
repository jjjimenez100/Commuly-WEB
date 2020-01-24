import React, { Component } from 'react';
import { Typography, HorizontalLine as Line, Card } from 'components';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Typography variant="h1">My Ops Team</Typography>
        <div className="home-events">
          <div className="home-events-title">
            <Typography variant="h4">Scheduled Events</Typography>
          </div>
          <Line />
          <div className="home-events-cards">
            <Card>
              <Typography>Sample text</Typography>
              <Typography variant="h5">Sample title</Typography>
              <Typography variant="subtitle">Sample subtitle</Typography>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

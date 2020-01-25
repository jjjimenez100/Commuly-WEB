import React, { Component } from 'react';
import { Typography, HorizontalLine as Line, Card, Button } from 'components';

import UnderstoodReact from 'assets/icons/understood-react.svg';
import ExcitedReact from 'assets/icons/excited-react.svg';
import ConfusedReact from 'assets/icons/confused-react.svg';
import BoredReact from 'assets/icons/bored-react.svg';

import CircleArrowLeftIcon from 'assets/icons/circle-arrow-left.svg';
import CircleArrowRightIcon from 'assets/icons/circle-arrow-right.svg';

import PinIcon from 'assets/icons/pin.svg';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Typography variant="h1">My Ops Team</Typography>
        <div className="home-events">
          <div className="home-events-title">
            <Typography variant="h4">Scheduled Events</Typography>
            <div className="home-events-title-buttons">
              <Button variant="inline">
                <img src={CircleArrowLeftIcon} alt="circle-arrow-left" />
              </Button>
              <Button variant="inline">
                <img src={CircleArrowRightIcon} alt="circle-arrow-right" />
              </Button>
            </div>
          </div>
          <Line />
          <div
            className="home-events-cards"
            ref={node => {
              this.container = node;
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <Card key={i} width={250} className="home-events-card">
                <Typography className="card-date">Sample text</Typography>
                <Line small className="card-line" />
                <Typography variant="h5" className="card-title">
                  Sample title Sample title Sample title Sample title Sample title Sample title
                </Typography>
                <Typography variant="subtitle">Sample subtitle</Typography>
              </Card>
            ))}
          </div>
        </div>

        <div className="home-announcements">
          <div className="home-announcements-title">
            <Typography variant="h4">Announcements</Typography>
          </div>
          <Line />
          <div className="home-announcements-cards">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} fullWidth>
                <div className="card-title">
                  <Typography variant="h5">Sample title</Typography>
                  <img src={PinIcon} alt="pin-icon" />
                </div>
                <Line small className="card-line" />
                <Typography className="card-body">Sample text</Typography>
                <div className="card-reacts">
                  <img className="card-react" src={UnderstoodReact} alt="understood-icon" />
                  <img className="card-react" src={ExcitedReact} alt="excited-icon" />
                  <img className="card-react" src={BoredReact} alt="bored-icon" />
                  <img className="card-react" src={ConfusedReact} alt="confused-icon" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

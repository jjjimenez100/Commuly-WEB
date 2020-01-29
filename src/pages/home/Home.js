import React, { Component } from 'react';
import { Typography, HorizontalLine as Line, Card, Button, RadioButton } from 'components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import UnderstoodReact from 'assets/icons/understood-react.svg';
import ExcitedReact from 'assets/icons/excited-react.svg';
import ConfusedReact from 'assets/icons/confused-react.svg';
import BoredReact from 'assets/icons/bored-react.svg';
import PinIcon from 'assets/icons/pin.svg';
import CircleArrowLeftIcon from 'assets/icons/circle-arrow-left.svg';
import CircleArrowRightIcon from 'assets/icons/circle-arrow-right.svg';
import TempAvatar from 'assets/images/avatar.jpg';
import { boardData, announcementsData, eventData } from './data';

class Home extends Component {
  state = {
    date: new Date(),
  };

  renderAnnouncements = data =>
    data.map(announcement => (
      <Card key={announcement.id} fullWidth>
        <div className="card-title">
          <Typography variant="h5">{announcement.title}</Typography>
          <Button inline>
            <img src={PinIcon} alt="pin-icon" />
          </Button>
        </div>
        <Line small className="card-line" />
        <Typography className="card-body">{announcement.text}</Typography>
        <div className="card-reacts">
          <Button inline className="card-react">
            <img src={UnderstoodReact} alt="understood-icon" />
          </Button>
          <Button inline className="card-react">
            <img src={ExcitedReact} alt="excited-icon" />
          </Button>
          <Button inline className="card-react">
            <img src={BoredReact} alt="bored-icon" />
          </Button>
          <Button inline className="card-react">
            <img src={ConfusedReact} alt="confused-icon" />
          </Button>
        </div>
      </Card>
    ));

  renderLeaderboard = data =>
    data.map(person => (
      <div key={person.id} className="home-leaderboard-person">
        <div className="person-image-wrapper">
          <img src={TempAvatar} alt="avatar" />
        </div>
        <div className="person-text">
          <Typography className="person-name">{person.name}</Typography>
          <Typography variant="subtitle" className="person-score">
            {person.score} points
          </Typography>
        </div>
      </div>
    ));

  renderScheduledEvents = data =>
    data.map(event => (
      <Card key={event.id} className="home-events-card">
        <Typography className="card-date">Sample text</Typography>
        <Line small className="card-line" />
        <Typography variant="h5" className="card-title">
          {event.title}
        </Typography>
        <Typography variant="subtitle">{event.date}</Typography>
      </Card>
    ));

  render() {
    return (
      <div className="home">
        <div className="home-container">
          <Typography variant="h1">My Ops Team</Typography>
          <div className="home-events">
            <div className="home-events-title">
              <Typography variant="h4">Scheduled Events</Typography>
              <div className="home-events-title-buttons">
                <Button inline>
                  <img src={CircleArrowLeftIcon} alt="circle-arrow-left" />
                </Button>
                <Button inline>
                  <img src={CircleArrowRightIcon} alt="circle-arrow-right" />
                </Button>
              </div>
            </div>
            <Line />
            <div className="home-events-cards">{this.renderScheduledEvents(eventData)}</div>
          </div>
          <div className="home-announcements">
            <div className="home-announcements-title">
              <Typography variant="h4">Announcements</Typography>
            </div>
            <Line />
            <div className="home-announcements-cards">
              {this.renderAnnouncements(announcementsData)}
            </div>
          </div>
        </div>
        <div className="home-sidebar">
          <div className="home-leaderboard">
            <Typography variant="h4" className="home-leaderboard-title">
              Leaderboard
            </Typography>
            <Line />
            <div className="home-leaderboard-board">{this.renderLeaderboard(boardData)}</div>
          </div>
          <div className="home-calendar">
            <Typography variant="h4" className="home-calendar-title">
              Calendar
            </Typography>
            <Line />
            <Calendar calendarType="US" onChange={this.onChange} value={this.state.date} />
          </div>
          <div className="home-todo">
            <Typography variant="h4" className="home-todo-title">
              To do
            </Typography>
            <Line />
            <div className="home-todo-list">
              <form>
                <RadioButton id="a" labelText="First todo" className="home-todo-radio" />
                <RadioButton id="b" labelText="First todo" className="home-todo-radio" />
                <RadioButton id="c" labelText="First todo" className="home-todo-radio" />
                <RadioButton id="d" labelText="First todo" className="home-todo-radio" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

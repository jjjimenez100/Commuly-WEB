import React, { Component } from 'react';
import {
  Typography,
  HorizontalLine as Line,
  Card,
  Button,
  RadioButton,
  Modal,
  CreateText,
  CreateImage,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuItem,
} from 'components';
import {
  UnderstoodReact,
  ExcitedReact,
  ConfusedReact,
  BoredReact,
  PinIcon,
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
  TempAvatar,
  TextIcon,
  ChartIcon,
  ImageIcon,
  PinOutlineIcon,
  EventIcon,
  ChoiceIcon,
  LikertIcon,
  OrderingIcon,
  QuestionIcon,
  ArrowDownIcon,
} from 'assets/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { boardData, announcementsData, eventData } from './data';

const CreateContentButtons = [
  {
    name: 'Text',
    icon: TextIcon,
  },
  {
    name: 'Chart',
    icon: ChartIcon,
  },
  {
    name: 'Image',
    icon: ImageIcon,
  },
  {
    name: 'To Do',
    icon: PinOutlineIcon,
  },
  {
    name: 'Event',
    icon: EventIcon,
  },
  {
    name: 'Multiple Choice',
    icon: ChoiceIcon,
  },
  {
    name: 'Likert',
    icon: LikertIcon,
  },
  {
    name: 'Column Order',
    icon: OrderingIcon,
  },
  {
    name: 'Open Question',
    icon: QuestionIcon,
  },
];

class Home extends Component {
  state = {
    date: new Date(),
    modalOpen: false,
    currentActiveModalIndex: 2,
    dropdownOpen: false,
  };

  handleModalOpen = (index = 0) =>
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      currentActiveModalIndex: index,
    }));

  handleDropdownOpen = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

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

  renderCreateContentButtons = () => (
    <div className="home-create-card-buttons">
      {CreateContentButtons.map((btn, i) => (
        <Button
          key={btn.name.toLowerCase().replace(' ', '-')}
          name={btn.name}
          variant="inline"
          className="home-create-card-button"
          onClick={() => this.handleModalOpen(i)}
        >
          <img src={btn.icon} alt={`${btn.name}`} className="create-icon" />
        </Button>
      ))}
    </div>
  );

  renderCreateContentModal = () => {
    switch (this.state.currentActiveModalIndex) {
      case 0:
        return <CreateText onClose={this.handleModalOpen} />;
      case 2:
        return <CreateImage onClose={this.handleModalOpen} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="home">
        <div className="home-container">
          <DropdownContainer className="home-dropdown">
            <Button
              variant="inline"
              size="small"
              icon={ArrowDownIcon}
              iconPosition="right"
              onClick={this.handleDropdownOpen}
            >
              <Typography variant="h1" className="home-title">
                My Ops Team
              </Typography>
            </Button>
            <DropdownMenu visible={this.state.dropdownOpen}>
              <DropdownMenuItem text="Hello world!" />
            </DropdownMenu>
          </DropdownContainer>
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
            <Card className="home-create-card">{this.renderCreateContentButtons()}</Card>
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
        <Modal
          isOpen={this.state.modalOpen}
          handleClose={this.handleModalOpen}
          title={`Create ${
            CreateContentButtons[this.state.currentActiveModalIndex]
              ? CreateContentButtons[this.state.currentActiveModalIndex].name
              : ''
          } Content`}
        >
          {this.renderCreateContentModal()}
        </Modal>
      </div>
    );
  }
}

export default Home;

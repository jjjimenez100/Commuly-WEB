import React, { Component } from 'react';
import {
  Typography,
  HorizontalLine as Line,
  Card,
  Button,
  RadioButton,
  Modal,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuItem,
  CreateContent,
  ContentCard,
} from 'components';
import {
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

import UserService from 'services/userService';

import {
  TEXT_CONTENT,
  CHART_CONTENT,
  IMAGE_CONTENT,
  TODO_CONTENT,
  SCHEDULED_CONTENT,
  MULTIPLE_CHOICE_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
  OPEN_TEXT_QUESTION,
} from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import { boardData, eventData } from './data';

const CreateContentButtons = {
  [TEXT_CONTENT]: {
    name: 'Text',
    icon: TextIcon,
    type: TEXT_CONTENT,
    order: 1,
  },
  [CHART_CONTENT]: {
    name: 'Chart',
    icon: ChartIcon,
    type: CHART_CONTENT,
    order: 2,
  },
  [IMAGE_CONTENT]: {
    name: 'Image',
    icon: ImageIcon,
    type: IMAGE_CONTENT,
    order: 3,
  },
  [TODO_CONTENT]: {
    name: 'To Do',
    icon: PinOutlineIcon,
    type: TODO_CONTENT,
    order: 4,
  },
  [SCHEDULED_CONTENT]: {
    name: 'Event',
    icon: EventIcon,
    type: SCHEDULED_CONTENT,
    order: 5,
  },
  [MULTIPLE_CHOICE_QUESTION]: {
    name: 'Multiple Choice',
    icon: ChoiceIcon,
    type: MULTIPLE_CHOICE_QUESTION,
    order: 6,
  },
  [LIKERT_QUESTION]: {
    name: 'Likert',
    icon: LikertIcon,
    type: LIKERT_QUESTION,
    order: 7,
  },
  [COLUMN_ORDERING_QUESTION]: {
    name: 'Column Order',
    icon: OrderingIcon,
    type: COLUMN_ORDERING_QUESTION,
    order: 8,
  },
  [OPEN_TEXT_QUESTION]: {
    name: 'Open Question',
    icon: QuestionIcon,
    type: OPEN_TEXT_QUESTION,
    order: 9,
  },
};

class Home extends Component {
  state = {
    date: new Date(),
    modalOpen: false,
    currentActiveModal: '',
    dropdownOpen: false,
    announcements: [],
    // eslint-disable-next-line react/no-unused-state
    scheduledEvents: [],
    // eslint-disable-next-line react/no-unused-state
    todos: [],
  };

  componentDidMount = async () => {
    const { userId } = getUserDetails();
    const { data } = await UserService.getCardsByUser(userId);

    // user here will be used to check which cards has been pinned, reacted, etc.
    // eslint-disable-next-line no-unused-vars
    const { scheduledCards, teamCards, todoCards, user } = data;
    this.setState({
      announcements: teamCards,
      // eslint-disable-next-line react/no-unused-state
      scheduledEvents: scheduledCards,
      // eslint-disable-next-line react/no-unused-state
      todos: todoCards,
    });
  };

  handleModalOpen = (activeContentType = '') => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
      currentActiveModal: activeContentType,
    }));
  };

  handleDropdownOpen = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

  renderAnnouncements = data =>
    data.length > 0 ? (
      // eslint-disable-next-line no-underscore-dangle
      data.map(announcement => <ContentCard key={announcement._id} {...announcement} />)
    ) : (
      <Card>No announcements yet!</Card>
    );

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
      {Object.values(CreateContentButtons)
        .sort((a, b) => (a.order > b.order ? 1 : -1))
        .map(btn => (
          <Button
            key={btn.type}
            name={btn.name}
            variant="inline"
            className="home-create-card-button"
            onClick={() => this.handleModalOpen(btn.type)}
          >
            <img src={btn.icon} alt={`${btn.name}`} className="create-icon" />
          </Button>
        ))}
    </div>
  );

  render() {
    const { announcements } = this.state;
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
              {this.renderAnnouncements(announcements)}
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
            CreateContentButtons[this.state.currentActiveModal]
              ? CreateContentButtons[this.state.currentActiveModal].name
              : ''
          } Content`}
        >
          <CreateContent
            contentType={this.state.currentActiveModal}
            onClose={this.handleModalOpen}
          />
        </Modal>
      </div>
    );
  }
}

export default Home;

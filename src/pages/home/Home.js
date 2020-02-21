import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {
  Typography,
  HorizontalLine as Line,
  Card,
  Button,
  Checkbox,
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
import { DONE_STATUS } from 'constants/user';
import { boardData } from './data';

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
    name: 'Scheduled Event',
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
    dropdownOpen: false,
  };

  componentDidMount = async () => {
    // user here will be used to check which cards has been pinned, reacted, etc.
    await this.props.store.home.getCards();
  };

  handleModalOpen = (activeContentType = '') => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
    this.props.store.home.setCurrentCreateModalType(activeContentType);
  };

  handleDropdownOpen = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

  renderAnnouncements = data => {
    if (data.length > 0) {
      return data.map(announcement => <ContentCard key={announcement._id} {...announcement} />);
    }
    return <Card className="home-announcements-empty">No announcements yet!</Card>;
  };

  renderTodos = data => {
    const { markTodo } = this.props.store.home;

    if (data.length > 0) {
      return data.map(({ _id: id, todoContent: { title }, status }) => {
        return (
          <Checkbox
            key={id}
            labelText={`${title}`}
            className="home-todo-radio"
            checked={status === DONE_STATUS}
            onChange={({ target: { checked } }) => markTodo(id, checked)}
          />
        );
      });
    }
    return <div>No todos!</div>;
  };

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
    data.map(
      ({
        _id: id,
        // TODO: include other date and time fields on card
        // eslint-disable-next-line no-unused-vars
        scheduledEventContent: { description, title, startDate, startTime, endDate, endTime },
      }) => {
        return (
          <Card key={id} className="home-events-card">
            <Typography className="card-date">{title}</Typography>
            <Line small className="card-line" />
            <Typography variant="h5" className="card-title">
              {description}
            </Typography>
            <Typography variant="subtitle">{startDate}</Typography>
          </Card>
        );
      }
    );

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
    const {
      todoCards,
      teamCards,
      scheduledCards,
      addCard,
      currentCreateModalType,
    } = this.props.store.home;
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
              <DropdownMenuItem text="Hello world!" onClick={() => null} />
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
            <div className="home-events-cards">{this.renderScheduledEvents(scheduledCards)}</div>
          </div>
          <div className="home-announcements">
            <div className="home-announcements-title">
              <Typography variant="h4">Announcements</Typography>
            </div>
            <Line />
            <Card className="home-create-card">{this.renderCreateContentButtons()}</Card>
            <div className="home-announcements-cards">{this.renderAnnouncements(teamCards)}</div>
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
              <form>{this.renderTodos(todoCards)}</form>
            </div>
          </div>
        </div>
        <CreateContent
          contentType={currentCreateModalType}
          isOpen={this.state.modalOpen}
          handleClose={this.handleModalOpen}
          title={`Create ${
            CreateContentButtons[currentCreateModalType]
              ? CreateContentButtons[currentCreateModalType].name
              : ''
          } Content`}
          addCard={addCard}
        />
      </div>
    );
  }
}

export default inject('store')(observer(Home));

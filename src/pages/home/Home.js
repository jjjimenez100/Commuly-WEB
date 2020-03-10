/*
Components with separate components:
1. EventTile - for onhover on sidebar calendar
2. ScheduledEvent - for mini cards on top of announcements
3. TodoTile - For todo cards on sidebar
4. Create Content Cards
5. Content Cards
*/

import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import Calendar from 'react-calendar';
import {
  Typography,
  HorizontalLine as Line,
  Card,
  Button,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuItem,
  CreateContent,
  ContentCard,
  Input,
  Responses,
} from 'components';
import {
  CircleArrowLeftIcon,
  CircleArrowRightIcon,
  TempAvatar,
  ArrowDownIcon,
  SearchIcon,
} from 'assets/icons';

import { getUserDetails } from 'utils/jwt';
import { EMPLOYEE_ROLE } from 'constants/user';
import { boardData, CreateContentButtons } from './data';

import EventTile from './components/EventTile';
import ScheduledEvent from './components/ScheduledEvent';
import TodoTile from './components/TodoTile';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalOpen: false,
      dropdownOpen: false,
      viewResponsesModal: false,
    };
    const { searchCards } = this.props.store.home;
    this.search = debounce(() => searchCards(), 300);
  }

  openViewResponsesModal = (cardData = {}) => {
    const { setCurrentCardData } = this.props.store.home;
    setCurrentCardData(cardData);
    this.setState({
      viewResponsesModal: true,
    });
  };

  closeViewResponsesModal = () => {
    this.setState({
      viewResponsesModal: false,
    });
  };

  handleSearchQueryChange = e => {
    const { setSearchQuery } = this.props.store.home;
    setSearchQuery(e.target.value);
    this.search();
  };

  componentDidMount = async () => {
    await this.props.store.home.getCards();
  };

  // cardData to be able to handle edit on modals
  handleModalOpen = (activeContentType = '', cardData = {}) => {
    const { setCurrentCreateModalType, setCurrentCardData } = this.props.store.home;
    setCurrentCreateModalType(activeContentType);
    setCurrentCardData(cardData);
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };

  handleDropdownOpen = () =>
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));

  renderAnnouncements = (
    data,
    {
      removeQuestionCard,
      pinCard,
      unpinCard,
      hasPinnedCardAsEmployee,
      hasPinnedCardAsProgramAdministrator,
      hasPinnedCardAsSupervisor,
      markTodo,
    }
  ) => {
    if (data.length > 0) {
      return data.map(announcement => {
        return (
          <ContentCard
            key={announcement._id}
            handleModalOpen={this.handleModalOpen}
            handleViewResponses={this.openViewResponsesModal}
            removeQuestionCard={removeQuestionCard}
            pinCard={pinCard}
            unpinCard={unpinCard}
            hasPinnedCardAsEmployee={hasPinnedCardAsEmployee}
            hasPinnedCardAsProgramAdministrator={hasPinnedCardAsProgramAdministrator}
            hasPinnedCardAsSupervisor={hasPinnedCardAsSupervisor}
            markTodo={markTodo}
            {...announcement}
          />
        );
      });
    }
    return <Card className="home-announcements-empty">No announcements yet!</Card>;
  };

  renderTodos = data => {
    const { markTodo } = this.props.store.home;

    if (data.length > 0) {
      return data.map(todo => {
        return (
          <TodoTile
            key={todo._id}
            handleModalOpen={this.handleModalOpen}
            markTodo={markTodo}
            {...todo}
          />
        );
      });
    }
    return <div>No todos!</div>;
  };

  // Use placeholders until this gets finalized
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

  renderScheduledEvents = data => {
    if (data.length > 0) {
      return data.map(({ _id: id, scheduledEventContent }) => (
        <ScheduledEvent key={id} {...scheduledEventContent} />
      ));
    }

    return <div>No scheduled events!</div>;
  };

  // Create Content Buttons are treated as constants because they have a specific ordering
  // TODO: Decide on implementation of search (if only on announcements or in global)
  renderCreateContentButtons = () => {
    const { role } = getUserDetails();
    const { searchQuery } = this.props.store.home;

    return (
      <Card className="home-create-card">
        <Input
          placeholder="Search announcements..."
          value={searchQuery}
          name="searchQuery"
          min={10}
          max={40}
          onChange={this.handleSearchQueryChange}
          className="home-create-card-search"
          icon={SearchIcon}
        />
        {role !== EMPLOYEE_ROLE
          ? Object.values(CreateContentButtons)
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
              ))
          : null}
      </Card>
    );
  };

  // sidebar calendar
  renderCalendar = eventCards => {
    const renderCalendarTile = ({ date }) => {
      const newDate = moment(date).format('YYYY-MM-DD');
      if (eventCards[newDate]) {
        return (
          <div className="home-calendar-tile">
            {eventCards[newDate].map(event => {
              return <EventTile key={event._id} {...event} />;
            })}
          </div>
        );
      }

      return null;
    };

    return (
      <div className="home-calendar">
        <Typography variant="h4" className="home-calendar-title">
          Calendar
        </Typography>
        <Line />
        <Calendar
          calendarType="US"
          onChange={this.onChange}
          value={this.state.date}
          tileContent={renderCalendarTile}
        />
      </div>
    );
  };

  // handlers for manual scrolling using buttons on Scheduled Events
  handleEventScrollLeft = () => {
    document.getElementById('home-scheduled-events').scrollLeft -= 266;
  };

  handleEventScrollRight = () => {
    document.getElementById('home-scheduled-events').scrollLeft += 266;
  };

  render() {
    const {
      filteredTodoCards: todoCards,
      filteredTeamCards: teamCards,
      filteredScheduledCards: scheduledCards,
      addCard,
      updateCard,
      currentCreateModalType,
      currentCardData,
      eventCards,
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
                <Button inline onClick={this.handleEventScrollLeft}>
                  <img src={CircleArrowLeftIcon} alt="circle-arrow-left" />
                </Button>
                <Button inline onClick={this.handleEventScrollRight}>
                  <img src={CircleArrowRightIcon} alt="circle-arrow-right" />
                </Button>
              </div>
            </div>
            <Line />
            <div className="home-events-cards" id="home-scheduled-events">
              {this.renderScheduledEvents(scheduledCards)}
            </div>
          </div>
          <div className="home-announcements">
            <div className="home-announcements-title">
              <Typography variant="h4">Announcements</Typography>
            </div>
            <Line />
            <br />

            {this.renderCreateContentButtons()}
            <div className="home-announcements-cards">
              {this.renderAnnouncements(teamCards, this.props.store.home)}
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
          {this.renderCalendar(eventCards)}
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
          title={`${
            CreateContentButtons[currentCreateModalType]
              ? CreateContentButtons[currentCreateModalType].name
              : ''
          } Content`}
          addCard={addCard}
          updateCard={updateCard}
          cardData={currentCardData}
        />
        {Object.keys(currentCardData).length !== 0 ? (
          <Responses
            handleClose={this.closeViewResponsesModal}
            cardData={currentCardData}
            isOpen={this.state.viewResponsesModal}
            key={currentCardData}
          />
        ) : null}
      </div>
    );
  }
}

export default inject('store')(observer(Home));

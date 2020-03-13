import React, { Component } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { observer, inject } from 'mobx-react';
import { Typography, Button, CreateContent } from 'components';
import { PlusIcon } from 'assets/icons';
import { SCHEDULED_CONTENT, TODO_CONTENT } from 'constants/card';
import moment from 'moment';
import { isEmployee } from '../../utils/user';

const localizer = momentLocalizer(moment);

class Calendar extends Component {
  state = {
    isModalOpen: false,
  };

  async componentDidMount() {
    const { eventCards } = this.props.store.home;
    if (Object.entries(eventCards).length === 0) {
      await this.props.store.home.getCards();
    }
  }

  handleModalOpen = () => {
    const { setCurrentCreateModalType } = this.props.store.home;
    setCurrentCreateModalType(SCHEDULED_CONTENT);
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { eventCards, addCard } = this.props.store.home;
    const eventCards1D = []
      .concat(...Object.values(eventCards))
      .reduce((accumulator, currentValue) => {
        return [
          ...accumulator,
          {
            start: currentValue.startDate,
            end:
              currentValue.contentCardType === TODO_CONTENT
                ? currentValue.startDate
                : currentValue.endDate,
            ...currentValue,
          },
        ];
      }, []);

    return (
      <div className="calendar">
        <div className="calendar-header">
          <Typography variant="h1" className="calendar-title">
            Calendar
          </Typography>
          {!isEmployee() ? (
            <Button icon={PlusIcon} size="small" onClick={this.handleModalOpen}>
              Add Scheduled Event
            </Button>
          ) : null}
        </div>
        <BigCalendar
          localizer={localizer}
          // eslint-disable-next-line prefer-spread
          events={eventCards1D}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={['month']}
        />
        <CreateContent
          contentType={SCHEDULED_CONTENT}
          isOpen={this.state.isModalOpen}
          handleClose={this.handleModalOpen}
          title="Create Scheduled Content"
          addCard={addCard}
        />
      </div>
    );
  }
}

export default inject('store')(observer(Calendar));

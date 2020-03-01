import React, { Component } from 'react';
import moment from 'moment';
import { Typography } from 'components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventTile = ({ todoContent: { title, startDate, endDate, startTime, endTime } }) => (
  <div className="home-calendar-tile-event">
    <Typography variant="subtitle">
      {startDate}
      {endDate && `- ${endDate}`}
    </Typography>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="subtitle">
      {startTime}-{endTime}
    </Typography>
  </div>
);

class CustomCalendar extends Component {
  state = {
    date: new Date(),
  };

  renderCalendarTile = ({ date }) => {
    const { eventCards } = this.props;

    const newDate = moment(date).format('YYYY-MM-DD');
    if (eventCards[newDate]) {
      return (
        <div className="home-calendar-tile">
          {eventCards[newDate].map(event => (
            <EventTile key={event._id} />
          ))}
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <Calendar
        calendarType="US"
        onChange={this.onChange}
        value={this.state.date}
        tileContent={this.renderCalendarTile}
      />
    );
  }
}
export default CustomCalendar;

import React from 'react';
import moment from 'moment';
import { Typography } from 'components';
import { convertTime } from 'utils/time';

const EventTile = ({ startDate, endDate, title, startTime, endTime }) => {
  return (
    <div className="home-calendar-tile-event">
      <Typography variant="subtitle">
        {!endDate || startDate === endDate
          ? moment(startDate).format('MMMM D, YYYY')
          : `${moment(startDate).format('MMMM D, YYYY')} - ${moment(endDate).format(
              'MMMM D, YYYY'
            )}`}
      </Typography>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle">
        {startTime === endTime
          ? convertTime(endTime)
          : `${convertTime(startTime)} - ${convertTime(endTime)}`}
      </Typography>
    </div>
  );
};

export default EventTile;

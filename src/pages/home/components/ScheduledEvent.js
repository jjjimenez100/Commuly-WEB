import React from 'react';
import moment from 'moment';
import { Card, Typography, HorizontalLine as Line } from 'components';
import { convertTime } from 'utils/time';

const ScheduledEvent = ({ title, startDate, endDate, startTime, endTime }) => (
  <Card className="home-events-card">
    <Typography className="card-title" variant="h4">
      {title}
    </Typography>
    <Line small className="card-line" />
    <Typography variant="subtitle">
      {startDate === endDate
        ? moment(startDate).format('MMMM D, YYYY')
        : `${moment(startDate).format('MMMM D, YYYY')} - ${moment(endDate).format('MMMM D, YYYY')}`}
    </Typography>
    <Typography variant="subtitle">
      {startTime === endTime
        ? convertTime(endTime)
        : `${convertTime(startTime)} - ${convertTime(endTime)}`}
    </Typography>
  </Card>
);

export default ScheduledEvent;

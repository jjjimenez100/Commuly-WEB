import React from 'react';
import moment from 'moment';
import { Typography } from 'components';

const ContentScheduledEvent = ({
  scheduledEventContent: { imagePosterURL, scheduledDate, name },
}) => {
  return (
    <div className="content-event">
      <div className="content-image content-event-image">
        <div className="content-image-overlay" />
        <img src={imagePosterURL} alt="url-post" />
      </div>
      <div className="content-event-header">
        <div className="content-event-date">
          <Typography>
            {moment(scheduledDate)
              .format('MMM')
              .toUpperCase()}
          </Typography>
          <Typography variant="h5">
            {moment(scheduledDate)
              .format('DD')
              .toUpperCase()}
          </Typography>
        </div>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="subtitle" className="content-event-subtitle">
          (date here){' '}
        </Typography>
      </div>
    </div>
  );
};

export default ContentScheduledEvent;

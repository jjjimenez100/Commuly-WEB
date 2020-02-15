import React from 'react';
import {
  Card,
  Button,
  Typography,
  HorizontalLine as Line,
  ContentText,
  ContentImage,
  ContentTodo,
  ContentScheduledEvent,
} from 'components';
import { TEXT_CONTENT, IMAGE_CONTENT, TODO_CONTENT, SCHEDULED_CONTENT } from 'constants/card';
import { PinIcon, UnderstoodReact, ExcitedReact, ConfusedReact, BoredReact } from 'assets/icons';

const ContentCard = ({ contentCardType, ...props }) => {
  const renderContentCard = () => {
    switch (contentCardType) {
      case TEXT_CONTENT:
        return <ContentText {...props} />;
      case IMAGE_CONTENT:
        return <ContentImage {...props} />;
      case TODO_CONTENT:
        return <ContentTodo {...props} />;
      case SCHEDULED_CONTENT:
        return <ContentScheduledEvent {...props} />;
      default:
        return null;
    }
  };

  return (
    <Card className="content-card content-text">
      <div className="content-card-title">
        <Typography variant="h5">
          {props.textContent ? props.textContent.title : 'New Supervisor Post'}
        </Typography>
        <Button inline>
          <img src={PinIcon} alt="pin-icon" />
        </Button>
      </div>
      <Line small className="content-card-line" />
      {renderContentCard()}
      <div className="content-card-reacts">
        <Button inline className="content-card-react">
          <img src={UnderstoodReact} alt="understood-icon" />
        </Button>
        <Button inline className="content-card-react">
          <img src={ExcitedReact} alt="excited-icon" />
        </Button>
        <Button inline className="content-card-react">
          <img src={BoredReact} alt="bored-icon" />
        </Button>
        <Button inline className="content-card-react">
          <img src={ConfusedReact} alt="confused-icon" />
        </Button>
      </div>
    </Card>
  );
};

export default ContentCard;

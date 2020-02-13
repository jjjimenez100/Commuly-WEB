import React from 'react';
import { Card, Button, Typography, HorizontalLine as Line } from 'components';
import { PinIcon, UnderstoodReact, ExcitedReact, ConfusedReact, BoredReact } from 'assets/icons';

const ContentText = ({ title, text }) => {
  return (
    <Card>
      <div className="card-title">
        <Typography variant="h5">{title}</Typography>
        <Button inline>
          <img src={PinIcon} alt="pin-icon" />
        </Button>
      </div>
      <Line small className="card-line" />
      <Typography className="card-body">{text}</Typography>
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
  );
};

export default ContentText;

import React from 'react';
import { Button, Typography, Card, HorizontalLine as Line } from 'components';

// For reference, here's some examples of what reusable components look like

const StyleGuide = () => (
  <div className="styleguide">
    <Button>This is a normal button</Button>
    <Button variant="small">This is a small button</Button>
    <Button variant="medium">This is a medium button</Button>
    <Button variant="large">This is a large button</Button>
    <Typography>Hello world!</Typography>
    <Typography variant="h1">Hello world!</Typography>
    <Typography variant="h2">Hello world!</Typography>
    <Typography variant="h3">Hello world!</Typography>
    <Typography variant="subtitle">Hello world!</Typography>
    <Card>Hello world</Card>
    <Line />
  </div>
);

export default StyleGuide;

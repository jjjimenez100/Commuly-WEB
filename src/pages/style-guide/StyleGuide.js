import React from 'react';
import { Button, Typography } from 'components';

const StyleGuide = () => (
  <div className="styleguide">
    <Button>This is a normal button</Button>
    <Button size="small">This is a small button</Button>
    <Button size="medium">This is a medium button</Button>
    <Button size="large">This is a large button</Button>
    <Typography>Hello world!</Typography>
    <Typography variant="h1">Hello world!</Typography>
    <Typography variant="h2">Hello world!</Typography>
    <Typography variant="h3">Hello world!</Typography>
  </div>
);

export default StyleGuide;

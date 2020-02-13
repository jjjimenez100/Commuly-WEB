import React from 'react';
import { Button, Typography, Card, HorizontalLine as Line, RadioButton, Spinner } from 'components';
import PlusIcon from 'assets/icons/plus.svg';
// For reference, here's some examples of what reusable components look like

const StyleGuide = () => (
  <div className="styleguide">
    <Button>This is a normal button</Button>
    <Button size="small">This is a small button</Button>
    <Button size="medium">This is a medium button</Button>
    <Button size="large">This is a large button</Button>
    <Button size="large">This is a large button</Button>
    <Button size="large" icon={PlusIcon}>
      This is a large button
    </Button>
    <Button size="small" icon={PlusIcon}>
      This is a small button
    </Button>
    <Button loading />
    <Button variant="ghost">This is a normal button</Button>
    <Button variant="ghost" inline>
      This is a normal button
    </Button>
    <Button variant="disabled">This is a normal button</Button>
    <Typography>Hello world!</Typography>
    <Typography variant="h1">Hello world!</Typography>
    <Typography variant="h2">Hello world!</Typography>
    <Typography variant="h3">Hello world!</Typography>
    <Typography variant="subtitle">Hello world!</Typography>
    <Card>Hello world</Card>
    <Line />
    <RadioButton id="radio-button" labelText="This is a test" />
    <Spinner />
  </div>
);

export default StyleGuide;

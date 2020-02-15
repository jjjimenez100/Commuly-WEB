import React, { Component } from 'react';
import { Typography, Input, Textarea, Button, ModalBody, ModalFooter } from 'components';
import { AddPeopleIcon, SendIcon, CalendarBlackIcon, TimerIcon } from 'assets/icons';

class CreateScheduledContent extends Component {
  state = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  render() {
    const { onClose } = this.props;
    return (
      <form>
        <ModalBody className="create-event">
          <Input
            labelText="Title"
            name="title"
            placeholder="Add title..."
            onChange={this.handleInputChanged}
            value={this.state.title}
          />
          <Textarea
            name="description"
            labelText="Description"
            placeholder="Add description..."
            onChange={this.handleInputChanged}
            value={this.state.description}
          />
          <div className="create-event-date">
            <Input
              icon={CalendarBlackIcon}
              type="date"
              labelText="Start Date"
              name="startDate"
              onChange={this.handleInputChanged}
              value={this.state.startDate}
            />
            <Typography>-</Typography>
            <Input
              type="date"
              labelText="End Date"
              name="endDate"
              onChange={this.handleInputChanged}
              value={this.state.endDate}
            />
          </div>
          <div className="create-event-time">
            <Input
              icon={TimerIcon}
              type="time"
              labelText="Start Time"
              name="startTime"
              onChange={this.handleInputChanged}
              value={this.state.startTime}
            />
            <Typography>-</Typography>
            <Input
              type="time"
              labelText="End Time"
              name="endTime"
              onChange={this.handleInputChanged}
              value={this.state.endTime}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button size="small" type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button size="small" type="button" icon={AddPeopleIcon}>
            Tag Teammates
          </Button>
          <Button size="small" type="submit" icon={SendIcon}>
            Post
          </Button>
        </ModalFooter>
      </form>
    );
  }
}

export default CreateScheduledContent;

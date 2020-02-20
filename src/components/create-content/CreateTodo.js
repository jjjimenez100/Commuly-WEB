import React, { Component } from 'react';
import moment from 'moment';
import { Typography, Input, Textarea, Button, ModalBody, ModalFooter } from 'components';
import { AddPeopleIcon, SendIcon, CalendarBlackIcon, TimerIcon } from 'assets/icons';
import { CONTENT_CARD, TODO_CONTENT } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateTodo extends Component {
  state = {
    title: '',
    description: '',
    startDate: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm'),
    endTime: moment().format('HH:mm'),
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // add validation for date and time here
    const { title, description, startDate, startTime, endTime } = this.state;
    const { team, userId: owner } = getUserDetails();
    // temporary while we don't have any mockups on adding todos
    // to selected individuals only
    const todoType = 'TEAM';
    const body = {
      cardType: CONTENT_CARD,
      contentCardType: TODO_CONTENT,
      team,
      owner,
      todoContent: {
        todoType,
        title,
        description,
        startDate,
        startTime,
        endTime,
      },
    };

    try {
      const { data } = await CardService.createNewContentCard(body);
      await this.props.addCard(data.savedCard);
      this.props.onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // handle if error, or transfer this whole trycatch to mobx instead
    }
  };

  render() {
    const { onClose } = this.props;
    return (
      <>
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
          <div className="create-event-time">
            <Input
              icon={CalendarBlackIcon}
              type="date"
              labelText="Start Date"
              name="startDate"
              onChange={this.handleInputChanged}
              value={this.state.startDate}
              className="create-todo-date"
            />
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
          <Button size="small" type="submit" icon={SendIcon} onClick={this.handleSubmit}>
            Post
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateTodo;

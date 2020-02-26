import React, { Component } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Typography, Input, Textarea, Button, ModalBody, ModalFooter } from 'components';
import { AddPeopleIcon, SendIcon, CalendarBlackIcon, TimerIcon } from 'assets/icons';
import { CONTENT_CARD, TODO_CONTENT } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    const { todoContent = {} } = this.props.cardData;
    const {
      description = '',
      title = '',
      startDate = '',
      startTime = '',
      endTime = '',
    } = todoContent;
    this.state = {
      title: title || '',
      description: description || '',
      startDate: startDate
        ? moment(new Date(startDate)).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      startTime: startTime ? moment(startTime, 'HH:mm').format('HH:mm') : moment().format('HH:mm'),
      endTime: endTime ? moment(endTime, 'HH:mm').format('HH:mm') : moment().format('HH:mm'),
    };
  }

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
      todoType,
    };

    const { addCard, updateCard, cardData, onClose } = this.props;
    try {
      if (Object.keys(cardData).length === 0) {
        const { data } = await CardService.createNewContentCard(body);
        await addCard(data.savedCard);
        toast.success('Successfully added new content!');
      } else {
        const { _id: cardId } = cardData;
        const {
          data: { updatedCard },
        } = await CardService.updateContentCard(cardId, body);
        updateCard(updatedCard);
        toast.success('Successfully updated content!');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to get a proper response from our services. Please try again later');
      // eslint-disable-next-line no-console
      console.log(error);
      // handle if error, or transfer this whole trycatch to mobx instead
    }
  };

  render() {
    const { onClose, cardData } = this.props;
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
            {Object.keys(cardData).length === 0 ? 'Post' : 'Update'}
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateTodo;

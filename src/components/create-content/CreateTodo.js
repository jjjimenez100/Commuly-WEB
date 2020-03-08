import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
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
      loading: false,
    };

    this.validator = new SimpleReactValidator({
      className: 'text-danger',
      autoForceUpdate: this,
    });
  }

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.validator.allValid()) {
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
        this.setState({ loading: true });
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

        this.setState({ loading: false });
        onClose();
      } catch (error) {
        toast.error('Failed to get a proper response from our services. Please try again later');
        // eslint-disable-next-line no-console
        console.log(error);
        // handle if error, or transfer this whole trycatch to mobx instead
      }
    } else {
      this.validator.showMessages();
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
          {this.validator.message('title', this.state.title, 'required')}
          <Textarea
            name="description"
            labelText="Description"
            placeholder="Add description..."
            onChange={this.handleInputChanged}
            value={this.state.description}
          />
          {this.validator.message('description', this.state.description, 'required')}
          <div className="create-event-time">
            <div>
              <Input
                icon={CalendarBlackIcon}
                type="date"
                labelText="Start Date"
                name="startDate"
                onChange={this.handleInputChanged}
                value={this.state.startDate}
                className="create-todo-date"
                min={moment().format('YYYY-MM-DD')}
              />
              {this.validator.message('startDate', this.state.startDate, 'required')}
            </div>
            <div>
              <Input
                icon={TimerIcon}
                type="time"
                labelText="Start Time"
                name="startTime"
                onChange={this.handleInputChanged}
                value={this.state.startTime}
              />
              {this.validator.message('startTime', this.state.startTime, 'required')}
            </div>
            <Typography>-</Typography>
            <div>
              <Input
                type="time"
                labelText="End Time"
                name="endTime"
                onChange={this.handleInputChanged}
                value={this.state.endTime}
              />
              {this.validator.message('endTime', this.state.endTime, 'required')}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={this.state.loading}
            size="small"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={this.state.loading} size="small" type="button" icon={AddPeopleIcon}>
            Tag Teammates
          </Button>
          <Button
            loading={this.state.loading}
            size="small"
            type="submit"
            icon={SendIcon}
            onClick={this.handleSubmit}
          >
            {Object.keys(cardData).length === 0 ? 'Post' : 'Update'}
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateTodo;

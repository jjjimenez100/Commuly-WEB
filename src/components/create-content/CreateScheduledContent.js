import React, { Component } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';

import { Typography, Input, Textarea, Button, ModalBody, ModalFooter } from 'components';
import { AddPeopleIcon, SendIcon, CalendarBlackIcon, TimerIcon } from 'assets/icons';
import { CONTENT_CARD, SCHEDULED_CONTENT } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateScheduledContent extends Component {
  constructor(props) {
    super(props);
    const { scheduledEventContent = {} } = this.props.cardData;
    const {
      startDate = '',
      endDate = '',
      startTime = '',
      endTime = '',
      title = '',
      description = '',
    } = scheduledEventContent;
    this.state = {
      title: title || '',
      description: description || '',
      startDate: startDate
        ? moment(new Date(startDate)).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      endDate: endDate
        ? moment(new Date(endDate)).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      startTime: startTime ? moment(startTime, 'HH:mm').format('HH:mm') : moment().format('HH:mm'),
      endTime: endTime ? moment(endTime, 'HH:mm').format('HH:mm') : moment().format('HH:mm'),
      file: null,
    };
  }

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleFileUpload = file => {
    this.setState({ file: file[0] });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { team, userId: owner } = getUserDetails();
    const { title, description, startDate, endDate, startTime, endTime, file } = this.state;
    const body = {
      cardType: CONTENT_CARD,
      contentCardType: SCHEDULED_CONTENT,
      team,
      owner,
      file,
    };
    const scheduledEventContent = {
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));
    formData.append('scheduledEventContent', JSON.stringify(scheduledEventContent));

    try {
      const { addCard, updateCard, cardData, onClose } = this.props;
      if (Object.keys(cardData).length === 0) {
        const { data } = await CardService.createNewContentCard(formData);
        await addCard(data.savedCard);
      } else {
        const shouldDeleteCloudFile = file !== null;
        formData.append('shouldDeleteCloudFile', shouldDeleteCloudFile);
        const { _id: cardId } = cardData;
        const {
          data: { updatedCard },
        } = await CardService.updateContentCardWithFiles(cardId, formData);
        await updateCard(updatedCard);
      }
      onClose();
    } catch (error) {
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
          <Typography variant="subtitle">Image</Typography>
          <Dropzone accept="image/*" onDrop={this.handleFileUpload}>
            {({ getRootProps, getInputProps, isDragAccept }) => (
              <div
                {...getRootProps({
                  className: classnames('create-todo-dropzone', {
                    'file-accept': isDragAccept,
                  }),
                })}
              >
                <input {...getInputProps()} />
                <Typography className="create-todo-dropzone-text">
                  {this.state.file
                    ? `${this.state.file.name}`
                    : 'Drag file here or click to select file.'}
                </Typography>
              </div>
            )}
          </Dropzone>
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

export default CreateScheduledContent;

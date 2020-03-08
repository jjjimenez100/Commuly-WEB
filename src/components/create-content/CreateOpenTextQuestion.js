import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, Button, Textarea, Input, Typography } from 'components';
import { SendIcon } from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import { OPEN_TEXT_QUESTION, QUESTION_CARD } from 'constants/card';
import CardService from 'services/cardService';

class CreateOpenTextQuestion extends Component {
  constructor(props) {
    super(props);
    const { openTextContent = {} } = this.props.cardData;
    const { title = '', question = '' } = openTextContent;

    this.state = {
      title,
      question,
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
      const { team, userId: owner } = getUserDetails();
      const { question, title } = this.state;
      const body = {
        owner,
        team,
        cardType: QUESTION_CARD,
        questionCardType: OPEN_TEXT_QUESTION,
        openTextContent: {
          question,
          title,
        },
      };

      const { addCard, updateCard, cardData } = this.props;
      try {
        this.setState({ loading: true });
        if (Object.keys(cardData).length === 0) {
          const {
            data: { savedCard },
          } = await CardService.createNewContentCard(body);
          addCard(savedCard);
          toast.success('Successfully added new question!');
        } else {
          const { _id: cardId } = cardData;
          const {
            data: { updatedCard },
          } = await CardService.updateContentCard(cardId, body);
          updateCard(updatedCard);
          toast.success('Successfully updated question!');
        }

        this.setState({ loading: false });
        this.props.onClose();
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
    const { openTextContent = {} } = cardData;
    const { responses = [] } = openTextContent;
    const numberOfResponses = responses.length;

    return (
      <>
        <ModalBody className="create-multiple-choice">
          <Input
            name="title"
            labelText="Title"
            placeholder="Add title..."
            onChange={this.handleInputChanged}
            value={this.state.title}
          />
          {this.validator.message('title', this.state.title, 'required')}
          <Textarea
            name="question"
            labelText="Question"
            placeholder="Add question..."
            onChange={this.handleInputChanged}
            value={this.state.question}
          />
          {this.validator.message('question', this.state.question, 'required')}
        </ModalBody>
        <ModalFooter>
          <Typography variant="subtitle" className="text-danger">
            {numberOfResponses !== 0
              ? 'Updating this card will reset all previously submitted answers.'
              : ''}
          </Typography>
          <Button
            disabled={this.state.loading}
            type="button"
            size="small"
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            loading={this.state.loading}
            type="submit"
            size="small"
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

export default CreateOpenTextQuestion;

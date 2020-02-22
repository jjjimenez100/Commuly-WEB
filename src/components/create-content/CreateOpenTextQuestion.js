import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Textarea, Input } from 'components';
import { SendIcon } from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import { OPEN_TEXT_QUESTION, QUESTION_CARD } from 'constants/card';
import CardService from 'services/cardService';

class CreateOpenTextQuestion extends Component {
  state = {
    title: '',
    question: '',
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { team, userId: owner } = getUserDetails();
    const { question } = this.state;
    const body = {
      owner,
      team,
      cardType: QUESTION_CARD,
      questionCardType: OPEN_TEXT_QUESTION,
      openTextContent: {
        question,
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
        <ModalBody className="create-multiple-choice">
          <Input
            name="title"
            labelText="Title"
            placeholder="Add title..."
            onChange={this.handleInputChanged}
            value={this.state.title}
          />
          <Textarea
            name="question"
            labelText="Question"
            placeholder="Add question..."
            onChange={this.handleInputChanged}
            value={this.state.question}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" size="small" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="small" icon={SendIcon} onClick={this.handleSubmit}>
            Post
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateOpenTextQuestion;

import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Input, Textarea, Typography } from 'components';
import { SendIcon, DeleteIcon } from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import { MULTIPLE_CHOICE_QUESTION, QUESTION_CARD } from 'constants/card';
import CardService from 'services/cardService';

class CreateMultipleChoice extends Component {
  constructor(props) {
    super(props);
    const { multipleChoiceContent = {} } = this.props.cardData;
    const { title = '', question = '', choices = ['', '', ''] } = multipleChoiceContent;

    this.state = {
      title,
      question,
      choices,
    };
  }

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleChoiceInputChanged = e => {
    const { choices } = this.state;
    const newChoices = [...choices];
    newChoices[parseInt(e.target.name, 10)] = e.target.value;
    this.setState({ choices: newChoices });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { team, userId: owner } = getUserDetails();
    const { question, choices, title } = this.state;
    const notEmptyChoices = choices.filter(choice => choice.trim() !== '');
    const body = {
      owner,
      team,
      cardType: QUESTION_CARD,
      questionCardType: MULTIPLE_CHOICE_QUESTION,
      multipleChoiceContent: {
        title,
        choices: notEmptyChoices,
        question,
      },
    };

    const { addCard, updateCard, cardData } = this.props;
    try {
      if (Object.keys(cardData).length === 0) {
        const {
          data: { savedCard },
        } = await CardService.createNewContentCard(body);
        addCard(savedCard);
      } else {
        const { _id: cardId } = cardData;
        const {
          data: { updatedCard },
        } = await CardService.updateContentCard(cardId, body);
        updateCard(updatedCard);
      }

      this.props.onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // handle if error, or transfer this whole trycatch to mobx instead
    }
  };

  handleChoiceAdded = () => {
    const { choices } = this.state;
    const newChoices = [...choices, ''];
    this.setState({ choices: newChoices });
  };

  handleChoiceDeleted = e => {
    const index = parseInt(e.target.name, 10);
    const { choices } = this.state;
    choices.splice(index, 1);
    this.setState({ choices });
  };

  render() {
    const { onClose, cardData } = this.props;
    const { multipleChoiceContent = {} } = cardData;
    const { responses = [] } = multipleChoiceContent;
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
          <Textarea
            name="question"
            labelText="Question"
            placeholder="Add question..."
            onChange={this.handleInputChanged}
            value={this.state.question}
          />
          <Typography variant="subtitle" className="input-description">
            Choices
          </Typography>
          <div className="create-multiple-choice-choices">
            {this.state.choices.map((choice, i) => (
              <div
                className="create-multiple-choice-input"
                // eslint-disable-next-line react/no-array-index-key
                key={`choice-${i}`}
              >
                <Input
                  name={i.toString()}
                  placeholder={`Choice ${i + 1}`}
                  onChange={this.handleChoiceInputChanged}
                  value={choice}
                />
                <Button
                  name={i.toString()}
                  icon={DeleteIcon}
                  variant="inline"
                  className="create-multiple-choice-input-button"
                  onClick={this.handleChoiceDeleted}
                />
              </div>
            ))}
          </div>
          <Button size="small" onClick={this.handleChoiceAdded}>
            Add New Choice
          </Button>
        </ModalBody>
        <ModalFooter>
          <Typography variant="subtitle" className="text-danger">
            {numberOfResponses !== 0
              ? 'Updating this card will reset all previously submitted answers.'
              : ''}
          </Typography>
          <Button type="button" size="small" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="small" icon={SendIcon} onClick={this.handleSubmit}>
            {Object.keys(cardData).length === 0 ? 'Post' : 'Update'}
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateMultipleChoice;

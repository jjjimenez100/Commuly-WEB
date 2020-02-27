import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
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
    this.validator = new SimpleReactValidator({
      className: 'text-danger',
      autoForceUpdate: this,
    });
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
    if (this.validator.allValid()) {
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
          toast.success('Successfully added new question!');
        } else {
          const { _id: cardId } = cardData;
          const {
            data: { updatedCard },
          } = await CardService.updateContentCard(cardId, body);
          updateCard(updatedCard);
          toast.success('Successfully updated question!');
        }

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

  handleChoiceAdded = () => {
    const { choices } = this.state;
    const newChoices = [...choices, ''];
    this.setState({ choices: newChoices });
  };

  handleChoiceDeleted = e => {
    const index = parseInt(e.target.name, 10);
    const { choices } = this.state;
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    this.setState({ choices: newChoices });
  };

  render() {
    const { onClose, cardData } = this.props;
    const { multipleChoiceContent = {} } = cardData;
    const { responses = [] } = multipleChoiceContent;
    const numberOfResponses = responses.length;
    this.validator.purgeFields();
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
          <Typography variant="subtitle" className="input-description">
            Choices
          </Typography>
          <div className="create-multiple-choice-choices">
            {this.state.choices.map((choice, i) => (
              <div>
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
                <span>
                  {this.validator.message(`Choice ${i + 1}`, this.state.choices[i], 'required')}
                </span>
                <br />
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

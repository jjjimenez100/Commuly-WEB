// Check previous commits for multiple likert charts, this only handles one likert chart

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { ModalBody, ModalFooter, Button, Textarea, Input, Typography } from 'components';
import { SendIcon } from 'assets/icons';
import { QUESTION_CARD, LIKERT_QUESTION } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateLikert extends Component {
  constructor(props) {
    super(props);
    const { likertContent = {} } = this.props.cardData;
    const { title = '', question = '', choices = {} } = likertContent;
    const { lowerBoundChoice: startInput = '', upperBoundChoice: endInput = '' } = choices;
    this.state = {
      title,
      question,
      startInput,
      endInput,
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
      const {
        question,
        startInput: lowerBoundChoice,
        endInput: upperBoundChoice,
        title,
      } = this.state;
      const body = {
        owner,
        team,
        cardType: QUESTION_CARD,
        questionCardType: LIKERT_QUESTION,
        likertContent: {
          question,
          title,
          choices: {
            lowerBoundChoice,
            upperBoundChoice,
          },
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

  render() {
    const { onClose, cardData } = this.props;
    const { likertContent = {} } = cardData;
    const { responses = [] } = likertContent;
    const numberOfResponses = responses.length;

    return (
      <>
        <ModalBody className="create-likert">
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
          <Typography variant="subtitle">Likert Chart</Typography>
          <div className="create-likert-chart">
            <div>
              <Input
                placeholder="Start Input"
                className="create-likert-chart-input"
                value={this.state.startInput}
                name="startInput"
                onChange={this.handleInputChanged}
              />
              {this.validator.message('startInput', this.state.startInput, 'required')}
            </div>
            {[...Array(10).keys()].map((_, i) => (
              <div className="create-likert-circle" key={i}>
                <Typography variant="subtitle">{i + 1}</Typography>
                <div className={`default-circle create-likert-circle-${i + 1}`} key={i} />
              </div>
            ))}
            <div>
              <Input
                placeholder="End Input"
                className="create-likert-chart-input"
                value={this.state.endInput}
                name="endInput"
                onChange={this.handleInputChanged}
              />
              {this.validator.message('endInput', this.state.endInput, 'required')}
            </div>
          </div>
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

export default CreateLikert;

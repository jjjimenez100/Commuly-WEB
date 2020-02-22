// Check previous commits for multiple likert charts, this only handles one likert chart

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Textarea, Input, Typography } from 'components';
import { SendIcon } from 'assets/icons';
import { QUESTION_CARD, LIKERT_QUESTION } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateLikert extends Component {
  state = {
    title: '',
    question: '',
    startInput: '',
    endInput: '',
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { team, userId: owner } = getUserDetails();
    const { question, startInput: lowerBoundChoice, endInput: upperBoundChoice } = this.state;
    const body = {
      owner,
      team,
      cardType: QUESTION_CARD,
      questionCardType: LIKERT_QUESTION,
      likertContent: {
        question,
        choices: {
          lowerBoundChoice,
          upperBoundChoice,
        },
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
        <ModalBody className="create-likert">
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
          <Typography variant="subtitle">Likert Chart</Typography>
          <div className="create-likert-chart">
            <Input
              placeholder="Start Input"
              className="create-likert-chart-input"
              value={this.state.startInput}
              name="startInput"
              onChange={this.handleInputChanged}
            />
            {[...Array(10).keys()].map((_, i) => (
              <div className="create-likert-circle" key={i}>
                <Typography variant="subtitle">{i + 1}</Typography>
                <div className={`default-circle create-likert-circle-${i + 1}`} key={i} />
              </div>
            ))}
            <Input
              placeholder="End Input"
              className="create-likert-chart-input"
              value={this.state.endInput}
              name="endInput"
              onChange={this.handleInputChanged}
            />
          </div>
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

export default CreateLikert;

/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Typography, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { isEmployee } from 'utils/user';
import { ADD_RESPONSE, COLUMN_ORDERING_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

class QuestionColumnOrdering extends Component {
  state = {
    choices: this.props.columnReorderingContent ? this.props.columnReorderingContent.choices : [],
    answers: [],
    activeDrop: '',
    loading: false,
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { userId } = getUserDetails();
    const { _id: cardId, removeQuestionCard } = this.props;
    const { answers } = this.state;
    const body = {
      userId,
      patchType: ADD_RESPONSE,
      questionCardType: COLUMN_ORDERING_QUESTION,
      response: {
        answers,
        userId,
      },
    };

    try {
      this.setState({ loading: true });
      await CardService.patchCard(cardId, body);
      toast.success('Thank you for answering!');
      this.setState({ loading: false });
      removeQuestionCard(cardId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  onDragStart = (ev, id, activeDrop) => {
    ev.dataTransfer.setData('id', id);
    ev.dataTransfer.setData('draggedItem', id);
    this.setState({ activeDrop });
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragOverItem = (ev, category, index) => {
    const currentDraggedItem = ev.dataTransfer.getData('draggedItem');
    if (category === this.state.activeDrop) {
      if (category === 'choices') {
        const { choices } = this.state;
        const draggedItem = choices[index];
        if (currentDraggedItem !== draggedItem) {
          const newItems = choices.filter(item => item !== currentDraggedItem);
          newItems.splice(index, 0, currentDraggedItem);
          this.setState({ choices: newItems });
        }
      } else {
        const { answers } = this.state;
        const draggedItem = answers[index];
        if (currentDraggedItem !== draggedItem) {
          const newItems = answers.filter(item => item !== currentDraggedItem);
          newItems.splice(index, 0, currentDraggedItem);
          this.setState({ answers: newItems });
        }
      }
    }
  };

  onDrop = (ev, category) => {
    const id = ev.dataTransfer.getData('id');
    const { choices, answers } = this.state;

    if (category !== this.state.activeDrop) {
      if (category === 'choices') {
        choices.push(id);
        const newAnswers = answers.filter(answer => answer !== id);
        this.setState({ choices, answers: newAnswers });
      } else if (category === 'answers') {
        answers.push(id);
        const newChoices = choices.filter(choice => choice !== id);
        this.setState({ answers, choices: newChoices });
      }
    }
  };

  render() {
    const { question } = this.props.columnReorderingContent;
    return (
      <div className="content-generic content-column-order">
        <Typography variant="h4" className="content-generic-title">
          Title here
        </Typography>
        <Typography variant="body">{question}</Typography>
        <div className="content-column-order-container">
          <div
            id="choices"
            className="content-column-order-drag content-column-order-choices"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, 'choices');
            }}
          >
            <Typography variant="h5">Choices</Typography>
            {this.state.choices.map((choice, i) => (
              <div
                key={choice}
                onDragStart={e => this.onDragStart(e, choice, 'choices', i)}
                onDragOver={e => this.onDragOverItem(e, 'choices', i)}
                draggable
                className="draggable draggable-option"
              >
                {choice}
              </div>
            ))}
          </div>
          <div
            id="answers"
            className="content-column-order-drag content-column-order-answers"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, 'answers')}
          >
            <Typography variant="h5">Answers</Typography>
            {this.state.answers.map((choice, i) => (
              <div
                key={choice}
                onDragStart={e => this.onDragStart(e, choice, 'answers', i)}
                draggable
                onDragOver={e => this.onDragOverItem(e, 'answers', i)}
                className="draggable draggable-answer"
              >
                {choice}
              </div>
            ))}
            {this.state.answers.length === 0 && (
              <Typography variant="subtitle">Drag and reorder your answers here.</Typography>
            )}
          </div>
        </div>
        {!isEmployee() ? (
          <Button loading={this.state.loading} size="small" onClick={this.handleSubmit}>
            Submit
          </Button>
        ) : null}
      </div>
    );
  }
}

export default QuestionColumnOrdering;

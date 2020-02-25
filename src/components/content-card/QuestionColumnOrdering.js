/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Typography, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { ADD_RESPONSE, COLUMN_ORDERING_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

class QuestionColumnOrdering extends Component {
  state = {
    optionDragIndex: -1,
    options: this.props.columnReorderingContent ? this.props.columnReorderingContent.choices : [],
  };

  onOptionDragStart = (e, index) => {
    const { options } = this.state;
    this.draggedItem = options[index];
    this.setState({ optionDragIndex: index });
    const { dataTransfer } = e;
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text/html', e.target.parentNode);
    dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onOptionDragOver = index => {
    const { options } = this.state;
    const draggedItem = options[index];

    if (this.draggedItem !== draggedItem) {
      this.setState({ optionDragIndex: index });
      const stateItems = [...options];
      const items = stateItems.filter(item => item !== this.draggedItem);
      items.splice(index, 0, this.draggedItem);
      this.setState({ options: items });
    }
  };

  onOptionDragEnd = () => {
    this.draggedItem = null;
    this.setState({ optionDragIndex: -1 });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { userId } = getUserDetails();
    const {
      _id: cardId,
      columnReorderingContent: { choices },
      removeQuestionCard,
    } = this.props;
    const { options: answer } = this.state;
    const body = {
      userId,
      patchType: ADD_RESPONSE,
      questionCardType: COLUMN_ORDERING_QUESTION,
      response: {
        answer,
        userId,
      },
    };

    try {
      await CardService.patchCard(cardId, body);
      toast.success('Thank you for answering!');
      this.setState({ options: choices });
      removeQuestionCard(cardId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  render() {
    const { optionDragIndex } = this.state;
    const { question } = this.props.columnReorderingContent;
    return (
      <div className="content-generic content-column-order">
        <Typography variant="h4" className="content-generic-title">
          Title here
        </Typography>
        <Typography variant="body">{question}</Typography>
        <ul className="content-column-order-options">
          {this.state.options.map((option, i) => (
            <li
              className="content-column-order-drag content-column-order-option"
              key={`option-${i}`}
              onDragOver={() => this.onOptionDragOver(i)}
            >
              <div
                key={i}
                className={`draggable draggable-option ${
                  i === optionDragIndex ? 'draggable-dragged-option' : ''
                }`}
                draggable
                onDragStart={e => this.onOptionDragStart(e, i)}
                onDragEnd={this.onOptionDragEnd}
              >
                <Typography className="content-column-order-text">{option}</Typography>
              </div>
            </li>
          ))}
        </ul>
        <Button size="small">Submit</Button>
      </div>
    );
  }
}

export default QuestionColumnOrdering;

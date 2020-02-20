/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Textarea, Input, Typography } from 'components';
import { SendIcon } from 'assets/icons';

class CreateColumnOrder extends Component {
  state = {
    title: '',
    question: '',
    options: ['Option 1', 'Option 2', 'Option 3'],
    answers: ['Answer 1', 'Answer 2', 'Answer 3'],
    optionDragIndex: -1,
    answerDragIndex: -1,
  };

  handleInputChanged = e => {
    this.state({ [`${e.target.name}`]: e.target.value });
  };

  handleAdd = () => {
    const { options, answers } = this.state;
    const newOptions = [...options, `Option ${options.length + 1}`];
    const newAnswers = [...answers, `Answer ${answers.length + 1}`];
    this.setState({ options: newOptions, answers: newAnswers });
  };

  handleOptionsInputChanged = e => {
    const { options } = this.state;
    options[parseInt(e.target.name, 10)] = e.target.value;
    this.setState({ options });
  };

  handleOptionDeleted = e => {
    const index = parseInt(e.target.name, 10);
    const { options } = this.state;
    options.splice(index, 1);
    this.setState({ options });
  };

  handleAnswersInputChanged = e => {
    const { answers } = this.state;
    answers[parseInt(e.target.name, 10)] = e.target.value;
    this.setState({ answers });
  };

  handleAnswerDeleted = e => {
    const index = parseInt(e.target.name, 10);
    const { answers } = this.state;
    answers.splice(index, 1);
    this.setState({ answers });
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

  onAnswerDragStart = (e, index) => {
    const { answers } = this.state;
    this.draggedItem = answers[index];
    this.setState({ answerDragIndex: index });
    const { dataTransfer } = e;
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text/html', e.target.parentNode);
    dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onAnswerDragOver = index => {
    const { answers } = this.state;
    const draggedItem = answers[index];

    if (this.draggedItem !== draggedItem) {
      this.setState({ answerDragIndex: index });
      const stateItems = [...answers];
      const items = stateItems.filter(item => item !== this.draggedItem);
      items.splice(index, 0, this.draggedItem);
      this.setState({ answers: items });
    }
  };

  onAnswerDragEnd = () => {
    this.draggedItem = null;
    this.setState({ answerDragIndex: -1 });
  };

  render() {
    const { onClose } = this.props;
    const { optionDragIndex, answerDragIndex } = this.state;

    return (
      <>
        <ModalBody className="create-column-order">
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
          <div className="create-column-order-columns">
            <ul className="create-column-order-options">
              <Typography variant="subtitle" className="input-description">
                Choices
              </Typography>
              {this.state.options.map((option, i) => (
                <li
                  className="create-column-order-drag create-column-order-option"
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
                    <input
                      value={option}
                      onChange={this.handleOptionsInputChanged}
                      name={i.toString()}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <ul className="create-column-order-answers">
              <Typography variant="subtitle" className="input-description">
                Answers
              </Typography>
              {this.state.answers.map((answer, i) => (
                <li
                  className="create-column-order-drag create-column-order-answer"
                  key={`answer-${i}`}
                  onDragOver={() => this.onAnswerDragOver(i)}
                >
                  <div
                    className={`draggable draggable-answer ${
                      i === answerDragIndex ? 'draggable-dragged-answer' : ''
                    }`}
                    draggable
                    onDragStart={e => this.onAnswerDragStart(e, i)}
                    onDragEnd={this.onAnswerDragEnd}
                  >
                    <input
                      value={answer}
                      onChange={this.handleAnswersInputChanged}
                      name={i.toString()}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="create-column-order-button">
            <Button size="small" onClick={this.handleAdd}>
              Add New Choice and Answer
            </Button>
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

export default CreateColumnOrder;

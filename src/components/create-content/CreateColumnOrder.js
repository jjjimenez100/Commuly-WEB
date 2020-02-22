/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Textarea, Input, Typography } from 'components';
import { SendIcon } from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import { COLUMN_ORDERING_QUESTION, QUESTION_CARD } from 'constants/card';
import CardService from 'services/cardService';

class CreateColumnOrder extends Component {
  state = {
    title: '',
    question: '',
    options: ['Option 1', 'Option 2', 'Option 3'],
    optionDragIndex: -1,
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleAddOptions = () => {
    const { options } = this.state;
    const newOptions = [...options, `Option ${options.length + 1}`];
    this.setState({ options: newOptions });
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
    const { team, userId: owner } = getUserDetails();
    const { question, options: choices } = this.state;
    const body = {
      owner,
      team,
      cardType: QUESTION_CARD,
      questionCardType: COLUMN_ORDERING_QUESTION,
      columnReorderingContent: {
        question,
        choices,
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
    const { optionDragIndex } = this.state;

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
          </div>
          <div className="create-column-order-button">
            <Button size="small" onClick={this.handleAddOptions}>
              Add New Choice
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

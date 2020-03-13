/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { ModalBody, ModalFooter, Button, Textarea, Input, Typography } from 'components';
import { SendIcon } from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import { COLUMN_ORDERING_QUESTION, QUESTION_CARD } from 'constants/card';
import CardService from 'services/cardService';
import { toast } from 'react-toastify';

class CreateColumnOrder extends Component {
  constructor(props) {
    super(props);
    const { columnReorderingContent = {} } = this.props.cardData;
    const {
      title = '',
      question = '',
      choices = ['Option 1', 'Option 2', 'Option 3'],
    } = columnReorderingContent;

    this.state = {
      title,
      question,
      options: [...choices],
      optionDragIndex: -1,
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
    if (this.validator.allValid()) {
      const { team, userId: owner } = getUserDetails();
      const { title, question, options: choices } = this.state;
      const body = {
        owner,
        team,
        cardType: QUESTION_CARD,
        questionCardType: COLUMN_ORDERING_QUESTION,
        columnReorderingContent: {
          title,
          question,
          choices,
        },
      };

      try {
        this.setState({ loading: true });

        const { addCard, updateCard, cardData } = this.props;
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
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // handle if error, or transfer this whole trycatch to mobx instead
      }
    } else {
      this.validator.showMessages();
    }

    this.setState({ loading: false });
    this.props.onClose();
  };

  render() {
    const { onClose, cardData = {} } = this.props;
    const { optionDragIndex } = this.state;
    this.validator.purgeFields();
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
          {this.validator.message('title', this.state.title, 'required')}
          <Textarea
            name="question"
            labelText="Question"
            placeholder="Add question..."
            onChange={this.handleInputChanged}
            value={this.state.question}
          />
          {this.validator.message('question', this.state.question, 'required')}
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
                  {this.validator.message(`Option ${i + 1}`, this.state.options[i], 'required')}
                </li>
              ))}
            </ul>
          </div>
          <Button size="small" onClick={this.handleAddOptions}>
            Add New Choice
          </Button>
        </ModalBody>
        <ModalFooter>
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

export default CreateColumnOrder;

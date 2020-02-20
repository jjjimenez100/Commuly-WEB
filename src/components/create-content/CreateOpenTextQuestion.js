import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Textarea, Input } from 'components';
import { SendIcon } from 'assets/icons';

class CreateOpenTextQuestion extends Component {
  state = {
    title: '',
    question: '',
    answer: '',
  };

  handleInputChanged = e => {
    this.state({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
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
          <Input
            name="answer"
            labelText="Answer"
            placeholder="Add answer..."
            onChange={this.handleInputChanged}
            value={this.state.answer}
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

import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button, Textarea, Input } from 'components';
import { SendIcon } from 'assets/icons';

class CreateLikert extends Component {
  state = {
    title: '',
    question: '',
  };

  handleInputChanged = e => {
    this.state({ [`${e.target.name}`]: e.target.value });
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

/*
suppressContentEditableWarning here: https://stackoverflow.com/questions/49639144/why-does-react-warn-against-an-contenteditable-component-having-children-managed
*/

import React, { Component } from 'react';
import {
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Typography,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuItem,
  Input,
} from 'components';
import { AddPeopleIcon, SendIcon, ArrowDownIcon } from 'assets/icons';

/*
Return as fragment to make modal-header, modal-body, and modal-footer as direct children of modal
Overflow will only be at modal-body
*/

class CreateText extends Component {
  state = {
    dropdownOpen: {
      textstyle: false,
      textsize: false,
      textcolor: false,
      textbg: false,
    },
    title: '',
    description: '',
  };

  handleDropdownOpen = e => {
    const { dropdownOpen } = this.state;
    dropdownOpen[e.target.name] = !dropdownOpen[e.target.name];
    this.setState({ dropdownOpen });
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  render() {
    const { onClose } = this.props;
    return (
      <>
        <ModalBody className="create create-text">
          <form>
            <Input
              labelText="Title"
              name="title"
              className="create-text-input"
              placeholder="Add title..."
              onChange={this.handleInputChanged}
              value={this.state.title}
            />
            <Textarea
              name="description"
              labelText="Description"
              placeholder="Add description..."
              onChange={this.handleInputChanged}
              value={this.state.description}
            />
            <div className="create-text-bg">
              <div className="create-text-sidebar">
                <Typography variant="subtitle" className="create-text-sidebar-subtitle">
                  Text Style
                </Typography>
                <DropdownContainer className="create-text-sidebar-dropdown">
                  <Button
                    name="textstyle"
                    variant="inline"
                    size="small"
                    icon={ArrowDownIcon}
                    iconPosition="right"
                    onClick={this.handleDropdownOpen}
                    className="create-text-sidebar-button"
                  >
                    <Typography>Gotham</Typography>
                  </Button>
                  <DropdownMenu visible={this.state.dropdownOpen.textstyle}>
                    <DropdownMenuItem
                      text="Hello world!"
                      buttonClassname="create-text-sidebar-dropitem"
                    />
                  </DropdownMenu>
                </DropdownContainer>
                <Typography variant="subtitle" className="create-text-sidebar-subtitle">
                  Text Size
                </Typography>
                <DropdownContainer className="create-text-sidebar-dropdown">
                  <Button
                    name="textsize"
                    variant="inline"
                    size="small"
                    icon={ArrowDownIcon}
                    iconPosition="right"
                    onClick={this.handleDropdownOpen}
                    className="create-text-sidebar-button"
                  >
                    <Typography className="home-title">42</Typography>
                  </Button>
                  <DropdownMenu visible={this.state.dropdownOpen.textsize}>
                    <DropdownMenuItem text="Hello world!" />
                  </DropdownMenu>
                </DropdownContainer>
                <Typography variant="subtitle" className="create-text-sidebar-subtitle">
                  Text Color
                </Typography>
                <DropdownContainer className="create-text-sidebar-dropdown">
                  <Button
                    name="textcolor"
                    variant="inline"
                    size="small"
                    icon={ArrowDownIcon}
                    iconPosition="right"
                    onClick={this.handleDropdownOpen}
                    className="create-text-sidebar-button"
                  >
                    <div className="create-text-sidebar-circle" />
                  </Button>
                  <DropdownMenu visible={this.state.dropdownOpen.textcolor}>
                    <DropdownMenuItem text="Hello world!" />
                  </DropdownMenu>
                </DropdownContainer>
                <Typography variant="subtitle" className="create-text-sidebar-subtitle">
                  Text Background
                </Typography>
                <DropdownContainer className="create-text-sidebar-dropdown">
                  <Button
                    name="textbg"
                    variant="inline"
                    size="small"
                    icon={ArrowDownIcon}
                    iconPosition="right"
                    onClick={this.handleDropdownOpen}
                    className="create-text-sidebar-button"
                  >
                    <div className="create-text-sidebar-circle" />
                  </Button>
                  <DropdownMenu visible={this.state.dropdownOpen.textbg}>
                    <DropdownMenuItem text="Hello world!" />
                  </DropdownMenu>
                </DropdownContainer>
              </div>
              <div contentEditable className="create-text-textarea" suppressContentEditableWarning>
                <div className="create-text-textarea-overlay" />
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button size="small" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button size="small" icon={AddPeopleIcon}>
            Tag Teammates
          </Button>
          <Button size="small" icon={SendIcon}>
            Post
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateText;

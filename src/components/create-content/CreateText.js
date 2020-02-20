/*
suppressContentEditableWarning here: https://stackoverflow.com/questions/49639144/why-does-react-warn-against-an-contenteditable-component-having-children-managed
*/

import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import {
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Typography,
  DropdownContainer,
  DropdownMenu,
  Input,
} from 'components';
import { AddPeopleIcon, SendIcon, ArrowDownIcon } from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import { CONTENT_CARD, TEXT_CONTENT } from 'constants/card';
import CardService from 'services/cardService';

/*
Return as fragment to make modal-header, modal-body, and modal-footer as direct children of modal
Overflow will only be at modal-body
*/

class CreateText extends Component {
  state = {
    dropdownOpen: false,
    currentActiveDropdown: '',
    description: '',
    textSize: 20,
    textColor: '#000000',
    backgroundColor: '#FFFFFF',
  };

  componentDidMount() {
    // disable enter key on textarea
    document.getElementById('create-textarea').onkeydown = e => {
      if (!e) {
        e = window.event;
      }

      if (e.keyCode === 13) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    };
  }

  handleDropdownOpen = e => {
    const { dropdownOpen, currentActiveDropdown } = this.state;
    if (dropdownOpen) {
      if (e.target.name === currentActiveDropdown) {
        this.setState({ dropdownOpen: false, currentActiveDropdown: '' });
      } else {
        this.setState({ currentActiveDropdown: e.target.name });
      }
    } else {
      this.setState({ dropdownOpen: true, currentActiveDropdown: e.target.name });
    }
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const title = document.getElementById('create-textarea').innerText;
    const { description: content, textSize, textColor, backgroundColor } = this.state;
    const textContent = {
      title,
      content,
      textSize,
      textColor,
      backgroundColor,
      fontStyle: 'Lato',
    };
    const { team, userId: owner } = getUserDetails();
    const body = {
      cardType: CONTENT_CARD,
      contentCardType: TEXT_CONTENT,
      team,
      owner,
      textContent,
    };

    try {
      const { data } = await CardService.createNewContentCard(body);

      console.log(data);
      await this.props.addCard(data.savedCard);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // handle if error, or transfer this whole trycatch to mobx instead
    }
  };

  handleTextSizeChange = e => {
    // add validation here
    // eslint-disable-next-line radix
    const textSize = parseInt(e.target.value);

    if (textSize >= 10 && textSize <= 40) {
      this.setState({ textSize });
      document.getElementById('create-textarea').style.fontSize = `${textSize}px`;
    } else {
      document.getElementById('create-textarea').style.fontSize = 20;
    }
  };

  handleColorChange = (color, name) => {
    this.setState({ [`${name}`]: color.hex });
    if (name === 'textColor') {
      document.getElementById('create-textarea').style.color = color.hex;
    } else {
      document.getElementById('create-textarea').style.backgroundColor = color.hex;
    }
    document.getElementById(`create-${name}`).style.backgroundColor = color.hex;
  };

  render() {
    const { onClose } = this.props;
    return (
      <>
        <ModalBody className="create-text-body">
          <form className="create create-text">
            <Textarea
              name="description"
              labelText="Description"
              placeholder="Add description..."
              onChange={this.handleInputChanged}
              value={this.state.description}
            />
            <div className="create-text-bg">
              <div className="create-text-sidebar">
                <Input
                  type="number"
                  labelText="Text Size"
                  value={this.state.textSize}
                  onChange={this.handleTextSizeChange}
                  name="textSize"
                  className="create-text-input"
                  min={10}
                  max={40}
                />
                <Typography variant="subtitle" className="create-text-sidebar-subtitle">
                  Text Color
                </Typography>
                <DropdownContainer className="create-text-sidebar-dropdown">
                  <Button
                    name="textColor"
                    variant="inline"
                    size="small"
                    icon={ArrowDownIcon}
                    iconPosition="right"
                    onClick={this.handleDropdownOpen}
                    className="create-text-sidebar-button"
                  >
                    <div id="create-textColor" className="create-text-sidebar-circle" />
                  </Button>
                  <DropdownMenu
                    className="create-text-dropdown-menu"
                    visible={
                      this.state.dropdownOpen && this.state.currentActiveDropdown === 'textColor'
                    }
                  >
                    <SketchPicker
                      color={this.state.textColor}
                      onChangeComplete={color => this.handleColorChange(color, 'textColor')}
                    />
                  </DropdownMenu>
                </DropdownContainer>
                <Typography variant="subtitle" className="create-text-sidebar-subtitle">
                  Text Background
                </Typography>
                <DropdownContainer className="create-text-sidebar-dropdown">
                  <Button
                    name="backgroundColor"
                    variant="inline"
                    size="small"
                    icon={ArrowDownIcon}
                    iconPosition="right"
                    onClick={this.handleDropdownOpen}
                    className="create-text-sidebar-button"
                  >
                    <div id="create-backgroundColor" className="create-text-sidebar-circle" />
                  </Button>
                  <DropdownMenu
                    className="create-text-dropdown-menu"
                    visible={
                      this.state.dropdownOpen &&
                      this.state.currentActiveDropdown === 'backgroundColor'
                    }
                  >
                    <SketchPicker
                      color={this.state.backgroundColor}
                      onChangeComplete={color => this.handleColorChange(color, 'backgroundColor')}
                    />
                  </DropdownMenu>
                </DropdownContainer>
              </div>
              <div
                contentEditable
                className="create-text-textarea"
                suppressContentEditableWarning
                styles={{
                  backgroundColor: this.state.backgroundColor,
                  color: this.state.textColor,
                }}
                id="create-textarea"
              >
                <div className="create-text-textarea-overlay" />
                Sample text
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" size="small" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" size="small" icon={AddPeopleIcon}>
            Tag Teammates
          </Button>
          <Button type="submit" size="small" icon={SendIcon} onClick={this.handleSubmit}>
            Post
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateText;

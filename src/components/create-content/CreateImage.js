/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import { ModalBody, ModalFooter, Button, Textarea, Typography } from 'components';
import { AddPeopleIcon, SendIcon, CloudUploadIcon } from 'assets/icons';
import { CONTENT_CARD, IMAGE_CONTENT } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateImage extends Component {
  state = {
    file: null,
    description: '',
  };

  handleFileUpload = file => {
    this.setState({ file: file[0] });
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { file } = this.state;
    const { team, userId: owner } = getUserDetails();
    const body = {
      cardType: CONTENT_CARD,
      contentCardType: IMAGE_CONTENT,
      team,
      owner,
      file,
    };
    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));

    try {
      const { data } = await CardService.createNewContentCard(formData);
      await this.props.addCard(data.savedCard);
      this.props.onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // handle if error, or transfer this whole trycatch to mobx instead
    }
  };

  render() {
    const { file } = this.state;
    const { onClose } = this.props;
    return (
      <>
        <ModalBody className="create create-image">
          <form>
            <Textarea
              name="description"
              labelText="Description"
              placeholder="Add description..."
              onChange={this.handleInputChanged}
              value={this.state.description}
            />
            <Dropzone accept="image/*" onDrop={this.handleFileUpload}>
              {({ getRootProps, getInputProps, isDragAccept }) => (
                <div
                  {...getRootProps({
                    className: classnames('create-image-dropzone', {
                      'file-accept': isDragAccept,
                    }),
                  })}
                >
                  <div className="create-image-overlay" />
                  <input {...getInputProps()} />
                  <Typography className="create-image-dropzone-text">
                    <img src={CloudUploadIcon} alt="cloud-upload-icon" />
                    {file ? `${file.name}` : 'Drag file here or click to select file.'}
                  </Typography>
                </div>
              )}
            </Dropzone>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button size="small" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button size="small" icon={AddPeopleIcon}>
            Tag Teammates
          </Button>
          <Button size="small" icon={SendIcon} onClick={this.handleSubmit}>
            Post
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateImage;

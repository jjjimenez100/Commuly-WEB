/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import { ModalBody, ModalFooter, Button, Textarea, Typography, Input } from 'components';
import { AddPeopleIcon, SendIcon, CloudUploadIcon } from 'assets/icons';

class CreateImage extends Component {
  state = {
    file: [],
    title: '',
    description: '',
  };

  handleFileUpload = file => {
    this.setState({ file: [...file] });
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  render() {
    const { file } = this.state;
    const { onClose } = this.props;
    return (
      <>
        <ModalBody className="create create-image">
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
                    {file.length > 0
                      ? `${file[0].name}`
                      : 'Drag file here or click to select file.'}
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
          <Button size="small" icon={SendIcon}>
            Post
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateImage;

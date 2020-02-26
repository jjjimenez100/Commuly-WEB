/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import { ModalBody, ModalFooter, Button, Textarea, Typography } from 'components';
import { AddPeopleIcon, SendIcon, CloudUploadIcon } from 'assets/icons';
import { CONTENT_CARD, IMAGE_CONTENT } from 'constants/card';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';

class CreateImage extends Component {
  constructor(props) {
    super(props);
    const { imageDescription = '' } = this.props.cardData;
    this.state = {
      file: null,
      imageDescription: imageDescription || '',
    };
  }

  handleFileUpload = file => {
    this.setState({ file: file[0] });
  };

  handleInputChanged = e => {
    this.setState({ [`${e.target.name}`]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { file, imageDescription } = this.state;
    const { team, userId: owner } = getUserDetails();
    const body = {
      cardType: CONTENT_CARD,
      contentCardType: IMAGE_CONTENT,
      imageDescription,
      team,
      owner,
      file,
    };
    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));
    try {
      const { addCard, updateCard, cardData } = this.props;
      if (Object.keys(cardData).length === 0) {
        const { data } = await CardService.createNewContentCard(formData);
        await addCard(data.savedCard);
        toast.success('Successfully added new content!');
      } else {
        const shouldDeleteCloudFile = file !== null;
        formData.append('shouldDeleteCloudFile', shouldDeleteCloudFile);
        const { _id: cardId } = cardData;
        const {
          data: { updatedCard },
        } = await CardService.updateContentCardWithFiles(cardId, formData);
        await updateCard(updatedCard);
        toast.success('Successfully updated content!');
      }
      this.props.onClose();
    } catch (error) {
      toast.error('Failed to get a proper response from our services. Please try again later');
      // eslint-disable-next-line no-console
      console.log(error);
      // handle if error, or transfer this whole trycatch to mobx instead
    }
  };

  render() {
    const { file, imageDescription } = this.state;
    const { onClose, cardData } = this.props;
    return (
      <>
        <ModalBody className="create create-image">
          <form>
            <Textarea
              name="imageDescription"
              labelText="Description"
              placeholder="Add description..."
              onChange={this.handleInputChanged}
              value={imageDescription}
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
            {Object.keys(cardData).length === 0 ? 'Post' : 'Update'}
          </Button>
        </ModalFooter>
      </>
    );
  }
}

export default CreateImage;

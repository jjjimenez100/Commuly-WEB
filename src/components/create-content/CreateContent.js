// generic create content here

import React from 'react';
import {
  CreateText,
  CreateImage,
  CreateScheduledContent,
  CreateTodo,
  CreateOpenTextQuestion,
  CreateMultipleChoice,
  CreateColumnOrder,
  CreateLikert,
  DeleteContent,
  Modal,
} from 'components';
import {
  TEXT_CONTENT,
  IMAGE_CONTENT,
  SCHEDULED_CONTENT,
  TODO_CONTENT,
  MULTIPLE_CHOICE_QUESTION,
  OPEN_TEXT_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
} from 'constants/card';

const CreateContent = ({
  contentType,
  handleClose,
  isOpen,
  title,
  addCard,
  updateCard,
  cardData,
}) => {
  const renderModalType = () => {
    switch (contentType) {
      case TEXT_CONTENT:
        return (
          <CreateText
            addCard={addCard}
            updateCard={updateCard}
            onClose={handleClose}
            cardData={cardData}
          />
        );
      case IMAGE_CONTENT:
        return <CreateImage addCard={addCard} onClose={handleClose} />;
      case SCHEDULED_CONTENT:
        return <CreateScheduledContent addCard={addCard} onClose={handleClose} />;
      case TODO_CONTENT:
        return <CreateTodo addCard={addCard} onClose={handleClose} />;
      case MULTIPLE_CHOICE_QUESTION:
        return <CreateMultipleChoice addCard={addCard} onClose={handleClose} />;
      case COLUMN_ORDERING_QUESTION:
        return <CreateColumnOrder addCard={addCard} onClose={handleClose} />;
      case LIKERT_QUESTION:
        return <CreateLikert addCard={addCard} onClose={handleClose} />;
      case OPEN_TEXT_QUESTION:
        return <CreateOpenTextQuestion addCard={addCard} onClose={handleClose} />;
      default:
        return <DeleteContent />;
    }
  };

  return (
    <Modal isOpen={isOpen} title={contentType ? title : 'Delete Content'} handleClose={handleClose}>
      {renderModalType()}
    </Modal>
  );
};

export default CreateContent;

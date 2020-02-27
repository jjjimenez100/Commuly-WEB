import React, { useState } from 'react';
import { Typography, Checkbox, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { ADD_RESPONSE, MULTIPLE_CHOICE_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

const QuestionMulitpleChoice = ({
  _id: cardId,
  multipleChoiceContent: { question, choices, title },
  removeQuestionCard,
}) => {
  const [answer, setAnswer] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    const { userId } = getUserDetails();
    const body = {
      userId,
      patchType: ADD_RESPONSE,
      questionCardType: MULTIPLE_CHOICE_QUESTION,
      response: {
        answer,
        userId,
      },
    };

    try {
      await CardService.addQuestionResponse(cardId, body);
      toast.success('Thank you for answering!');
      setAnswer('');
      removeQuestionCard(cardId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="content-generic content-multiple-choice">
      <Typography variant="h4" className="content-generic-title">
        {title}
      </Typography>
      <Typography variant="body">{question}</Typography>
      <form className="content-multiple-choice-choices">
        {choices.map((choice, index) => (
          <Checkbox
            id={choice}
            // eslint-disable-next-line react/no-array-index-key
            key={`${title}-choice-${choice}-${index}`}
            type="radio"
            checked={choice === answer}
            className="content-multiple-choice-single"
            onChange={() => setAnswer(choice)}
          >
            <Typography>{choice}</Typography>
          </Checkbox>
        ))}
      </form>
      <Button size="small" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default QuestionMulitpleChoice;

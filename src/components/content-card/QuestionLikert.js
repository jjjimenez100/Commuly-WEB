/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Checkbox, Typography, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { ADD_RESPONSE, LIKERT_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

const QuestionLikert = ({
  _id: cardId,
  likertContent: {
    question,
    choices: { lowerBoundChoice, upperBoundChoice },
  },
}) => {
  const [answer, setAnswer] = useState(0);
  const handleSubmit = async e => {
    e.preventDefault();
    const { userId } = getUserDetails();
    const body = {
      userId,
      patchType: ADD_RESPONSE,
      questionCardType: LIKERT_QUESTION,
      response: {
        answer,
        userId,
      },
    };

    try {
      await CardService.addQuestionResponse(cardId, body);
      toast.success('Thank you for answering!');
      setAnswer(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="content-generic">
      <Typography variant="h4" className="content-generic-title">
        Title here
      </Typography>
      <Typography variant="body">{question}</Typography>
      <div className="content-likert">
        <Typography variant="h5" className="content-likert-text left-align">
          {lowerBoundChoice}
        </Typography>
        <div className="content-likert-choices">
          {[...Array(10).keys()].map((_, i) => (
            <div key={i} className="content-likert-choice">
              <Typography variant="subtitle">{i + 1}</Typography>
              <Checkbox
                id={(i + 1).toString()}
                type="radio"
                value={i + 1}
                checked={answer === i + 1 && !answer}
                onChange={() => setAnswer(i + 1)}
              />
            </div>
          ))}
        </div>
        <Typography variant="h5" className="content-likert-text">
          {upperBoundChoice}
        </Typography>
      </div>
      <Button size="small" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default QuestionLikert;

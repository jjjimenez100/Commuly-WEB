/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Checkbox, Typography, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { isEmployee } from 'utils/user';
import { ADD_RESPONSE, LIKERT_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

const QuestionLikert = ({
  _id: cardId,
  likertContent: {
    title,
    question,
    choices: { lowerBoundChoice, upperBoundChoice },
  },
  removeQuestionCard,
}) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(0);
  const [hasAnswerError, setAnswerError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (answer === 0) {
      setAnswerError(true);
      return;
    }

    setAnswerError(false);
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
      setLoading(true);
      await CardService.patchCard(cardId, body);
      toast.success('Thank you for answering!');
      setAnswer(0);
      setLoading(false);
      removeQuestionCard(cardId);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="content-generic">
      <Typography variant="h4" className="content-generic-title">
        {title}
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
      <p className="text-danger" style={{ display: 'flex', justifyContent: 'center' }}>
        {hasAnswerError ? 'Select a valid choice.' : ''}
      </p>
      {isEmployee() ? (
        <Button loading={loading} size="small" onClick={handleSubmit}>
          Submit
        </Button>
      ) : null}
    </div>
  );
};

export default QuestionLikert;

import React, { useState } from 'react';
import { Textarea, Typography, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { isEmployee } from 'utils/user';
import { ADD_RESPONSE, OPEN_TEXT_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

const QuestionOpenText = ({
  _id: cardId,
  openTextContent: { question, title },
  removeQuestionCard,
}) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [hasAnswerError, setAnswerError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (answer === '') {
      setAnswerError(true);
      return;
    }

    setAnswerError(false);
    const { userId } = getUserDetails();
    const body = {
      userId,
      patchType: ADD_RESPONSE,
      questionCardType: OPEN_TEXT_QUESTION,
      response: {
        answer,
        userId,
      },
    };

    try {
      setLoading(true);
      await CardService.patchCard(cardId, body);
      toast.success('Thank you for answering!');
      setAnswer('');
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
      <Textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        name="answer"
        className="content-generic-textarea"
      />
      <p className="text-danger">{hasAnswerError ? 'Enter your response.' : ''}</p>
      <br />
      {isEmployee() ? (
        <Button loading={loading} size="small" onClick={handleSubmit}>
          Submit
        </Button>
      ) : null}
    </div>
  );
};

export default QuestionOpenText;

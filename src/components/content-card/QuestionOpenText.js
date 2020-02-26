import React, { useState } from 'react';
import { Textarea, Typography, Button } from 'components';
import { toast } from 'react-toastify';
import { getUserDetails } from 'utils/jwt';
import { ADD_RESPONSE, OPEN_TEXT_QUESTION } from 'constants/card';
import CardService from 'services/cardService';

const QuestionOpenText = ({ _id: cardId, openTextContent: { question, title } }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
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
      await CardService.addQuestionResponse(cardId, body);
      toast.success('Thank you for answering!');
      setAnswer('');
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
      <Button size="small" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default QuestionOpenText;

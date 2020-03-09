import React from 'react';
import moment from 'moment';
import { Typography, Button } from 'components';
import { convertTime } from 'utils/time';
// import { DONE_STATUS } from 'constants/user';

const ContentTodo = ({
  _id: cardId,
  todoContent: { description, title, startDate, startTime, endTime },
  removeQuestionCard,
  markTodo,
}) => {
  return (
    <div className="content-todo">
      {/* TODO: Add checker if done, show checked sign; else hide */}
      <div className="circle" />
      <div className="content-todo-body">
        <Typography variant="h4" className="todo-title">
          {title}
        </Typography>
        <Typography variant="h5">{description}</Typography>
        <Typography>
          {moment(startDate).format('LL')} ({convertTime(startTime)}) - ({convertTime(endTime)})
        </Typography>
        {/* TODO: Add checker if done, hide button; else show */}
        <Button
          size="small"
          className="content-todo-button"
          onClick={() => {
            markTodo(cardId, true);
            removeQuestionCard(cardId);
          }}
        >
          Mark as Done
        </Button>
      </div>
    </div>
  );
};

export default ContentTodo;

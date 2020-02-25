import React from 'react';
import moment from 'moment';
import { Typography } from 'components';

// FIXME @ced
const ContentTodo = ({
  // eslint-disable-next-line no-unused-vars
  todoContent: { description, title, startDate, endDate, startTime, endTime },
}) => {
  return (
    <div className="content-todo">
      <div className="circle" />
      <div className="content-todo-body">
        <Typography variant="h4" className="todo-title">
          {title}
        </Typography>
        <Typography variant="h5">{description}</Typography>
        <Typography>
          {moment(startDate).format('LL')} ({`${startTime}`}) - ({`${endTime}`})
        </Typography>
      </div>
    </div>
  );
};

export default ContentTodo;

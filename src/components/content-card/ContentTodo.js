import React from 'react';
import moment from 'moment';
import { Typography } from 'components';

const ContentTodo = ({
  // eslint-disable-next-line no-unused-vars
  todoContent: { description, title, startDate, endDate, startTime, endTime },
}) => {
  const convertTime = time => {
    const hours = parseInt(time.substring(0, 2), 10);
    const minutes = parseInt(time.substring(3, 5), 10);
    if (hours > 12) {
      return `${hours - 12}:${minutes} PM`;
    }

    return `${time} AM`;
  };

  return (
    <div className="content-todo">
      <div className="circle" />
      <div className="content-todo-body">
        <Typography variant="h4" className="todo-title">
          {title}
        </Typography>
        <Typography variant="h5">{description}</Typography>
        <Typography>
          {moment(startDate).format('LL')} ({convertTime(startTime)}) - ({convertTime(endTime)})
        </Typography>
      </div>
    </div>
  );
};

export default ContentTodo;

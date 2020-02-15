import React from 'react';
import moment from 'moment';
import { Typography } from 'components';

const ContentTodo = ({ todoContent: { name, startDate, endDate, startTime, endTime } }) => {
  return (
    <div className="content-todo">
      <div className="circle" />
      <div className="content-todo-body">
        <Typography variant="h4" className="todo-title">
          To Do
        </Typography>
        <Typography variant="h5">{name}</Typography>
        <Typography>
          {moment(startDate).format('LL')} ({moment(startTime).format('LT')}) -{' '}
          {moment(endDate).format('LL')} ({moment(endTime).format('LT')})
        </Typography>
      </div>
    </div>
  );
};

export default ContentTodo;

import React from 'react';
import moment from 'moment';
import { convertTime } from 'utils/time';
import { Typography, Checkbox, Button } from 'components';
import { DONE_STATUS } from 'constants/user';
import { TODO_CONTENT } from 'constants/card';
import { EditIcon } from 'assets/icons';

const TodoTile = props => {
  const { _id: id, todoContent, status, markTodo, handleModalOpen } = props;
  const { title, startDate, startTime, endTime } = todoContent;

  return (
    <Checkbox
      key={id}
      id={id}
      className="home-todo-radio"
      checked={status === DONE_STATUS}
      onChange={({ target: { checked } }) => markTodo(id, checked)}
    >
      <Typography variant="subtitle">{moment(startDate).format('LL')}</Typography>
      <div className="home-todo-radio-title">
        <Typography>{title}</Typography>
        <Button
          inline
          className="home-todo-radio-edit"
          onClick={() => handleModalOpen(TODO_CONTENT, { _id: id, todoContent })}
        >
          <img src={EditIcon} alt="edit" />
        </Button>
      </div>
      <Typography variant="subtitle">
        {startTime === endTime
          ? `${convertTime(endTime)}`
          : `${convertTime(startTime)} - ${convertTime(endTime)}`}
      </Typography>
    </Checkbox>
  );
};

export default TodoTile;

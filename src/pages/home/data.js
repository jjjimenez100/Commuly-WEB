import {
  TextIcon,
  ChartIcon,
  ImageIcon,
  PinOutlineIcon,
  EventIcon,
  ChoiceIcon,
  LikertIcon,
  OrderingIcon,
  QuestionIcon,
} from 'assets/icons';

import {
  TEXT_CONTENT,
  CHART_CONTENT,
  IMAGE_CONTENT,
  TODO_CONTENT,
  SCHEDULED_CONTENT,
  MULTIPLE_CHOICE_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
  OPEN_TEXT_QUESTION,
} from 'constants/card';

export const CreateContentButtons = {
  [TEXT_CONTENT]: {
    name: 'Text',
    icon: TextIcon,
    type: TEXT_CONTENT,
    order: 1,
  },
  [CHART_CONTENT]: {
    name: 'Chart',
    icon: ChartIcon,
    type: CHART_CONTENT,
    order: 2,
  },
  [IMAGE_CONTENT]: {
    name: 'Image',
    icon: ImageIcon,
    type: IMAGE_CONTENT,
    order: 3,
  },
  [TODO_CONTENT]: {
    name: 'To Do',
    icon: PinOutlineIcon,
    type: TODO_CONTENT,
    order: 4,
  },
  [SCHEDULED_CONTENT]: {
    name: 'Scheduled Event',
    icon: EventIcon,
    type: SCHEDULED_CONTENT,
    order: 5,
  },
  [MULTIPLE_CHOICE_QUESTION]: {
    name: 'Multiple Choice',
    icon: ChoiceIcon,
    type: MULTIPLE_CHOICE_QUESTION,
    order: 6,
  },
  [LIKERT_QUESTION]: {
    name: 'Likert',
    icon: LikertIcon,
    type: LIKERT_QUESTION,
    order: 7,
  },
  [COLUMN_ORDERING_QUESTION]: {
    name: 'Column Order',
    icon: OrderingIcon,
    type: COLUMN_ORDERING_QUESTION,
    order: 8,
  },
  [OPEN_TEXT_QUESTION]: {
    name: 'Open Question',
    icon: QuestionIcon,
    type: OPEN_TEXT_QUESTION,
    order: 9,
  },
};

export const boardData = [
  {
    id: 1,
    name: 'John Cedric Gaza',
    score: 1,
  },
  {
    id: 2,
    name: 'Keith Liam Manaloto',
    score: 50,
  },
  {
    id: 3,
    name: 'Jane Gloriana Villanueva',
    score: 100,
  },
];

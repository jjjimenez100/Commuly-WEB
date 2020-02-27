import React, { useState } from 'react';
import {
  Card,
  Button,
  Typography,
  HorizontalLine as Line,
  ContentText,
  ContentImage,
  ContentTodo,
  ContentScheduledEvent,
  QuestionMultipleChoice,
  QuestionOpenText,
  QuestionLikert,
  QuestionColumnOrdering,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuItem,
} from 'components';
import {
  TEXT_CONTENT,
  IMAGE_CONTENT,
  TODO_CONTENT,
  SCHEDULED_CONTENT,
  MULTIPLE_CHOICE_QUESTION,
  OPEN_TEXT_QUESTION,
  LIKERT_QUESTION,
  COLUMN_ORDERING_QUESTION,
} from 'constants/card';
import {
  PinIcon,
  VerticalMenuIcon,
  UnderstoodReact,
  ExcitedReact,
  ConfusedReact,
  BoredReact,
} from 'assets/icons';

const ContentCard = ({
  handleModalOpen,
  handleViewResponses,
  contentCardType,
  questionCardType,
  ...props
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderContentCard = () => {
    if (contentCardType) {
      switch (contentCardType) {
        case TEXT_CONTENT:
          return <ContentText {...props} />;
        case IMAGE_CONTENT:
          return <ContentImage {...props} />;
        case TODO_CONTENT:
          return <ContentTodo {...props} />;
        case SCHEDULED_CONTENT:
          return <ContentScheduledEvent {...props} />;
        default:
          return null;
      }
    }

    if (questionCardType) {
      switch (questionCardType) {
        case MULTIPLE_CHOICE_QUESTION:
          return <QuestionMultipleChoice {...props} />;
        case OPEN_TEXT_QUESTION:
          return <QuestionOpenText {...props} />;
        case LIKERT_QUESTION:
          return <QuestionLikert {...props} />;
        case COLUMN_ORDERING_QUESTION:
          return <QuestionColumnOrdering {...props} />;
        default:
          return null;
      }
    }

    return null;
  };

  const handleEditClicked = () => {
    const cardData = props;
    handleModalOpen(contentCardType || questionCardType, cardData);
    setDropdownOpen(false);
  };

  const handleViewResponsesClicked = () => {
    const cardData = { ...props, questionCardType };
    handleViewResponses(cardData);
    setDropdownOpen(false);
  };

  const handleReactionClicked = async e => {
    const { userId } = getUserDetails();
    const body = {
      userId,
      reactionType: e.target.name,
    };

    // for unreact
    if (reaction === e.target.name) {
      setReaction('');
      body.patchType = UNREACT;
    } else {
      // new reaction / change reaction
      setReaction(e.target.name);
      body.patchType = REACT;
    }

    try {
      await CardService.patchCard(props._id, body);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    if (reactions) {
      const { userId } = getUserDetails();
      const returnedIndex = Object.entries(reactions).find(
        entry =>
          entry[1].length > 0 && Array.isArray(entry[1]) && entry[1].find(id => id === userId)
      );

      if (returnedIndex) {
        setReaction(returnedIndex[0].toUpperCase());
      }
    }
  }, []);

  return (
    <Card className="content-card">
      <div className="content-card-title">
        <Typography variant="h5">New Supervisor Post</Typography>
        <div className="content-card-buttons">
          <Button inline>
            <img src={PinIcon} alt="pin-icon" />
          </Button>

          <DropdownContainer className="content-card-dropdown">
            <Button inline onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={VerticalMenuIcon} alt="vertical-menu" />
            </Button>
            <DropdownMenu visible={dropdownOpen}>
              {questionCardType ? (
                <DropdownMenuItem text="View Responses" onClick={handleViewResponsesClicked} />
              ) : null}
              <DropdownMenuItem text="Edit" onClick={handleEditClicked} />
            </DropdownMenu>
          </DropdownContainer>
        </div>
      </div>
      <Line small className="content-card-line" />
      {renderContentCard()}
      <div className="content-card-reacts">
        <Button inline className="content-card-react">
          <img src={UnderstoodReact} alt="understood-icon" />
        </Button>
        <Button inline className="content-card-react">
          <img src={ExcitedReact} alt="excited-icon" />
        </Button>
        <Button inline className="content-card-react">
          <img src={BoredReact} alt="bored-icon" />
        </Button>
        <Button inline className="content-card-react">
          <img src={ConfusedReact} alt="confused-icon" />
        </Button>
      </div>
    </Card>
  );
};

export default ContentCard;

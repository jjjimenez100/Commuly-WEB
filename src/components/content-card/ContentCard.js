import React, { useState, useEffect } from 'react';
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
  REACT,
  UNREACT,
  UNDERSTOOD,
  BORED,
  EXCITED,
  CONFUSED,
} from 'constants/card';
import {
  PinIcon,
  PinBlackIcon,
  VerticalMenuIcon,
  UnderstoodReact,
  ExcitedReact,
  ConfusedReact,
  BoredReact,
  UnderstoodReactBW,
  ExcitedReactBW,
  ConfusedReactBW,
  BoredReactBW,
} from 'assets/icons';
import { getUserDetails } from 'utils/jwt';
import CardService from 'services/cardService';
// eslint-disable-next-line no-unused-vars
import UserService from 'services/userService';
// eslint-disable-next-line no-unused-vars
import { EMPLOYEE_ROLE, SUPERVISOR_ROLE, PROGRAM_ADMINISTRATOR_ROLE } from '../../constants/user';

const ContentCard = ({
  handleModalOpen,
  handleViewResponses,
  contentCardType,
  questionCardType,
  reactions,
  isPinned,
  ...props
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState('');
  const [reaction, setReaction] = useState('');

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
    const { name: newReaction } = e.target;
    const body = {
      userId,
      reactionType: newReaction,
    };

    // for unreact
    if (reaction === newReaction) {
      setReaction('');
      body.patchType = UNREACT;
    } else {
      // new reaction / change reaction
      try {
        await CardService.patchCard(props._id, {
          userId,
          reactionType: reaction,
          patchType: UNREACT,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      setReaction(newReaction);
      body.patchType = REACT;
    }

    try {
      await CardService.patchCard(props._id, body);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleDropdownOpen = name => {
    if (dropdownOpen) {
      if (name === activeDropdown) {
        setActiveDropdown('');
        setDropdownOpen(false);
      } else {
        setActiveDropdown(name);
      }
    } else {
      setActiveDropdown(name);
      setDropdownOpen(!dropdownOpen);
    }
  };

  const renderPinOptions = (isPinned, pinType = '') => {
    const { role } = getUserDetails();
    if (isPinned) {
      // User pinned card
      if (!pinType) {
        return <DropdownMenuItem text="Unpin Post" />;
      }
      // Supervisor or Program admin pinned card
      if (role === PROGRAM_ADMINISTRATOR_ROLE || (role === SUPERVISOR_ROLE && role === pinType)) {
        return <DropdownMenuItem text={`Unpin Post as ${pinType}`} />;
      }
    }

    if (role === PROGRAM_ADMINISTRATOR_ROLE) {
      return (
        <>
          <DropdownMenuItem text={`Pin Post as ${PROGRAM_ADMINISTRATOR_ROLE}`} />
          <DropdownMenuItem text={`Pin Post as ${SUPERVISOR_ROLE}`} />
          <DropdownMenuItem text="Pin Post" />
        </>
      );
    }

    if (role === SUPERVISOR_ROLE) {
      return (
        <>
          <DropdownMenuItem text={`Pin Post as ${SUPERVISOR_ROLE}`} />
          <DropdownMenuItem text="Pin Post" />
        </>
      );
    }

    return <DropdownMenuItem text="Pin Post" />;
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
  }, [reactions]);

  return (
    <Card className={`content-card ${isPinned && 'content-card-pinned'}`}>
      <div className="content-card-title">
        <Typography variant="h5">New Supervisor Post</Typography>
        <div className="content-card-buttons">
          <DropdownContainer className="content-card-dropdown">
            {isPinned ? (
              <Button
                onClick={() => handleDropdownOpen('pin')}
                icon={PinIcon}
                size="small"
                className="content-card-pinned-button"
              >
                <Typography variant="subtitle">Pinned Post</Typography>
              </Button>
            ) : (
              <Button onClick={() => handleDropdownOpen('pin')} inline>
                <img src={PinBlackIcon} alt="pin-icon" />
              </Button>
            )}
            <DropdownMenu visible={dropdownOpen && activeDropdown === 'pin'}>
              {renderPinOptions(isPinned)}
            </DropdownMenu>
          </DropdownContainer>

          <DropdownContainer className="content-card-dropdown">
            <Button inline onClick={() => handleDropdownOpen('options')}>
              <img src={VerticalMenuIcon} alt="vertical-menu" />
            </Button>
            <DropdownMenu visible={dropdownOpen && activeDropdown === 'options'}>
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
        <Button
          onClick={handleReactionClicked}
          name={UNDERSTOOD}
          inline
          className="content-card-react"
        >
          <img
            src={
              reaction.length > 0 && reaction !== UNDERSTOOD ? UnderstoodReactBW : UnderstoodReact
            }
            alt="understood-icon"
          />
        </Button>
        <Button
          onClick={handleReactionClicked}
          name={EXCITED}
          inline
          className="content-card-react"
        >
          <img
            src={reaction.length > 0 && reaction !== EXCITED ? ExcitedReactBW : ExcitedReact}
            alt="excited-icon"
          />
        </Button>
        <Button onClick={handleReactionClicked} name={BORED} inline className="content-card-react">
          <img
            src={reaction.length > 0 && reaction !== BORED ? BoredReactBW : BoredReact}
            alt="bored-icon"
          />
        </Button>
        <Button
          onClick={handleReactionClicked}
          name={CONFUSED}
          inline
          className="content-card-react"
        >
          <img
            src={reaction.length > 0 && reaction !== CONFUSED ? ConfusedReactBW : ConfusedReact}
            alt="confused-icon"
          />
        </Button>
      </div>
    </Card>
  );
};

export default ContentCard;

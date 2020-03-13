import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import lodash from 'lodash';
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
import TeamService from '../../services/teamService';
// eslint-disable-next-line no-unused-vars
import { EMPLOYEE_ROLE, SUPERVISOR_ROLE, PROGRAM_ADMINISTRATOR_ROLE } from '../../constants/user';

const ContentCard = cardData => {
  const {
    pinCard,
    unpinCard,
    handleModalOpen,
    handleViewResponses,
    contentCardType,
    questionCardType,
    reactions,
    pinType,
    isAllowedToPin,
    isAllowedToUnpin,
    isPinned,
    ...props
  } = cardData;

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

  const pinCardHandler = async (cardData, role) => {
    const { team, userId } = getUserDetails();
    const { _id: cardId } = cardData;

    pinCard(cardData, role);
    setDropdownOpen(false);
    try {
      if (role === SUPERVISOR_ROLE) {
        await TeamService.pinCardToTeamStream(team, cardId, SUPERVISOR_ROLE);
      } else if (role === PROGRAM_ADMINISTRATOR_ROLE) {
        await TeamService.pinCardToTeamStream(team, cardId, PROGRAM_ADMINISTRATOR_ROLE);
      } else if (role === EMPLOYEE_ROLE) {
        await UserService.pinCardToUserStream(userId, cardId);
      }
      // temp workaround
      window.location.reload();
      // toast.success('Successfully pinned card!');
    } catch (error) {
      toast.error('Failed to pin card. Please try again later.');
    }
  };

  const unpinCardHandler = async (cardData, role) => {
    const { team, userId } = getUserDetails();
    const { _id: cardId } = cardData;

    unpinCard(cardData, role);
    setDropdownOpen(false);
    try {
      if (role === SUPERVISOR_ROLE) {
        await TeamService.unpinCardToTeamStream(team, cardId);
      } else if (role === PROGRAM_ADMINISTRATOR_ROLE) {
        await TeamService.unpinCardToTeamStream(team, cardId);
      } else if (role === EMPLOYEE_ROLE) {
        await UserService.unpinCardToUserStream(userId, cardId);
      }
      // temp workaround
      window.location.reload();
      // toast.success('Successfully unpinned card!');
    } catch (error) {
      toast.error('Failed to pin card. Please try again later.');
    }
  };

  const renderPinDropdownItems = (renderPin, renderUnpin) => {
    const pinTypeText = lodash.startCase(pinType.toLowerCase());
    if (isPinned) {
      if (renderUnpin) {
        return (
          <>
            <Button
              onClick={() => handleDropdownOpen('pin')}
              icon={PinIcon}
              size="small"
              className="content-card-pinned-button"
            >
              <Typography variant="subtitle">{pinTypeText} Pinned Post</Typography>
            </Button>
            <DropdownMenu visible={dropdownOpen && activeDropdown === 'pin'}>
              <DropdownMenuItem
                text={`Unpin Post as ${pinTypeText}`}
                onClick={() => unpinCardHandler(cardData, pinType)}
              />
            </DropdownMenu>
          </>
        );
      }
      return (
        <Button
          onClick={() => {}}
          icon={PinIcon}
          size="small"
          className="content-card-pinned-button"
        >
          <Typography variant="subtitle">Pinned Post as ${pinTypeText}</Typography>
        </Button>
      );
    }

    if (renderPin) {
      return (
        <>
          <Button onClick={() => handleDropdownOpen('pin')} inline>
            <img src={PinBlackIcon} alt="pin-icon" />
          </Button>

          <DropdownMenu visible={dropdownOpen && activeDropdown === 'pin'}>
            <DropdownMenuItem
              text={`Pin Post as ${pinTypeText}`}
              onClick={() => pinCardHandler(cardData, pinType)}
            />
          </DropdownMenu>
        </>
      );
    }
    return null;
  };

  const renderPinDropdownOptions = () => {
    const renderUnpin = isPinned && isAllowedToUnpin;
    const renderPin = !isPinned && isAllowedToPin;
    const renderDropdown = renderPin || renderUnpin;
    if (renderDropdown) {
      return (
        <DropdownContainer className="content-card-dropdown">
          {renderPinDropdownItems(renderPin, renderUnpin)}
        </DropdownContainer>
      );
    }

    return null;
  };

  const isNotEmployeeRole = () => {
    const { role } = getUserDetails();
    return role !== EMPLOYEE_ROLE;
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
        <Typography variant="h5">New Post</Typography>
        <div className="content-card-buttons">
          {renderPinDropdownOptions()}
          {isNotEmployeeRole() ? (
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
          ) : null}
        </div>
      </div>
      <Line small className="content-card-line" />
      {renderContentCard()}
      {!isNotEmployeeRole() ? (
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
          <Button
            onClick={handleReactionClicked}
            name={BORED}
            inline
            className="content-card-react"
          >
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
      ) : null}
    </Card>
  );
};

export default ContentCard;

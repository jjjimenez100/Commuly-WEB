/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button, Typography } from 'components';

/* 
separate dropdown into three:
1. Container: for the view
2. Menu: container for the items
3. Item: container for the dropdown item

Item is clickable
*/

export const DropdownContainer = ({ className, children }) => (
  <div className={classnames('dropdown', { [`${className}`]: className })}>{children}</div>
);

DropdownContainer.defaultProps = {
  className: '',
};

DropdownContainer.propTypes = {
  className: PropTypes.string,
};

export const DropdownMenu = ({ visible, className, children }) => (
  <ul
    className={classnames('dropdown-menu', {
      [`${className}`]: className,
      'dropdown-menu-visible': visible,
    })}
  >
    {children}
  </ul>
);

DropdownMenu.defaultProps = {
  className: '',
};

DropdownMenu.propTypes = {
  className: PropTypes.string,
};

export const DropdownMenuItem = ({ text, onClick, className, ...buttonProps }) => {
  const { buttonClassname } = buttonProps;

  return (
    <li className={classnames('dropdown-menu-item', { [`${className}`]: className })}>
      <Button
        className={classnames('dropdown-menu-item-button', {
          [`${buttonClassname}`]: buttonClassname,
        })}
        variant="inline"
        onClick={onClick}
        {...buttonProps}
      >
        <Typography>{text}</Typography>
      </Button>
    </li>
  );
};

DropdownMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

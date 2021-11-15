import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.module.css';

export const CustomButton = ({ htmlType, disabled, onClick, children, type }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={htmlType} disabled={disabled} onClick={onClick} className={`${styles.button} ${styles[type]}`}>
    {children}
  </button>
);

CustomButton.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'secondary']),
};
CustomButton.defaultProps = {
  disabled: false,
  htmlType: 'button',
  onClick: null,
  type: 'primary',
};

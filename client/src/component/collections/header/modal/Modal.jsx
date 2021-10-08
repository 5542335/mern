import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

export const Modal = ({ open, children }) => (
  <div className={open ? 'modal open' : 'modal'}>
    <div className={open ? 'modal-content' : 'modal-content open'}>{children}</div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

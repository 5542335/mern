import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal.module.css';

export const CustomModal = ({ open, children }) => (
  <div className={open ? `${styles.modal} ${styles.open}` : `${styles.modal}`}>
    <div className={open ? `${styles.modalContent}` : `${styles.modalContent} ${styles.open}`}>{children}</div>
  </div>
);

CustomModal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
};

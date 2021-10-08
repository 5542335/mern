import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './addBtn.css';

export const AddBtn = () => {
  const history = useHistory();
  const handleRedirectToHome = useCallback(() => {
    history.push('/');
  });

  return (
    <>
      <div className="btnContainer">
        <div className="txtUnderBtn">Здесь пока ничего нет :(</div>
        <div>
          <button type="button" className="addButton" onClick={handleRedirectToHome}>
            Добавить
          </button>
        </div>
      </div>
    </>
  );
};

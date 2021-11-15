import { useState, useCallback, useRef } from 'react';

export const useTextArea = () => {
  const message = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [enableBtn, setEnableBtn] = useState(true);
  const [showCommentLine, setShowCommentLine] = useState(false);
  const commentFocus = useCallback(() => {
    setShowButtons(true);
    setShowCommentLine(true);
  }, []);

  const handleCancelBtn = useCallback(() => {
    setShowButtons(false);
    message.current.value = '';
    setShowCommentLine(false);
  }, []);

  const commentStroke = useCallback((event) => {
    const currMessage = event.target.value;

    if (currMessage) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }

    setShowCommentLine(true);
  }, []);

  return {
    commentFocus,
    commentStroke,
    enableBtn,
    handleCancelBtn,
    message,
    setShowButtons,
    setShowCommentLine,
    showButtons,
    showCommentLine,
  };
};

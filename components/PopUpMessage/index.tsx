import React from 'react';

import { UploadPopUpMessage } from '@components/PopUpMessage/style';
import { TypedIcon } from 'typed-design-system';

interface PopUpMessageProps {
  message: string;
  handleClosePopUp: () => void;
}

export default function PopUpMessage({ message, handleClosePopUp }: PopUpMessageProps) {
  return (
    <UploadPopUpMessage>
      <button type="button" onClick={handleClosePopUp}>
        <TypedIcon icon="close_small" style={{ fontSize: '15px' }} />
      </button>
      <p>{message}</p>
    </UploadPopUpMessage>
  );
}

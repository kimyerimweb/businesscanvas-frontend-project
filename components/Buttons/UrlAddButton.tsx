import React, { useState, useCallback } from 'react';

import { UrlButton } from '@components/Buttons/style';
import UrlAddForm from '@components/Forms/UrlAddForm';

export default function UrlAddButton() {
  const [view, setView] = useState(false);

  const handleToggleView = useCallback(() => {
    setView((prev) => !prev);
  }, []);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <UrlButton type="button" onClick={handleToggleView}>
          URL 추가
        </UrlButton>

        {view && <UrlAddForm view={view} setView={setView} />}
      </div>
    </>
  );
}

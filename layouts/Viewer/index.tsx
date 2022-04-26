import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/configureStore';
import { replaceValue, toggleView } from '@reducer/viewSlice';

export default function Viewer() {
  const { view, value } = useSelector((state: RootState) => state.view);
  const dispatch = useDispatch();

  const handleCloseViewer = useCallback(() => {
    dispatch(toggleView(false));
    dispatch(replaceValue(null));
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {view && (
        <div>
          <div>
            <header>{value && 'url' in value ? value.name : value?.image.name}</header>
            <button type="button" onClick={handleCloseViewer}>
              닫기
            </button>
          </div>
          {value && 'url' in value ? <iframe src={value.url} frameBorder="0"></iframe> : null}
        </div>
      )}
    </div>
  );
}

import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/configureStore';
import { replaceValue, toggleView } from '@reducer/viewSlice';

export default function Viewer() {
  const { view, value } = useSelector((state: RootState) => state.view);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null | undefined>();

  useEffect(() => {
    handleShowImage();

    return () => {
      handleShowImage();
    };
  });

  const handleCloseViewer = useCallback(() => {
    dispatch(toggleView(false));
    dispatch(replaceValue(null));
  }, [dispatch]);

  const handleShowImage = useCallback(() => {
    if (!value || 'url' in value) {
      return false;
    }
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result);
    reader.readAsDataURL(value.image);
  }, [value]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      {view && (
        <div>
          <header>
            <h1>{value && 'url' in value ? value.name : value?.image.name}</h1>
            <button type="button" onClick={handleCloseViewer}>
              닫기
            </button>
          </header>
          <main>
            {value && 'url' in value ? (
              <iframe src={value.url} frameBorder="0"></iframe>
            ) : (
              <div>
                <img src={typeof imageUrl === 'string' ? imageUrl : undefined} alt="" />
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

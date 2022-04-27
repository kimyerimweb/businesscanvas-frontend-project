import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/configureStore';
import { replaceValue, toggleView } from '@reducer/viewSlice';

import { ViewerContainer } from '@layouts/Viewer/style';
import { TypedIcon } from 'typed-design-system';

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
    <ViewerContainer>
      {view && (
        <div>
          <header>
            <h1>{value && 'url' in value ? value.name : value?.image.name}</h1>
            <button type="button" onClick={handleCloseViewer}>
              <TypedIcon icon="close_small" style={{ fontSize: '25px' }} />
            </button>
          </header>
          <main>
            {value && 'url' in value ? (
              <div>
                <iframe src={value.url} frameBorder="0"></iframe>
              </div>
            ) : (
              <div>
                <img src={typeof imageUrl === 'string' ? imageUrl : undefined} alt="" />
              </div>
            )}
          </main>
        </div>
      )}
    </ViewerContainer>
  );
}

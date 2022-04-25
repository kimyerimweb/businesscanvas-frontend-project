import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { add } from '../../reducer/urlSlice';
import checkExistenceOfScheme from '@utils/scheme';
import checkYoutubeAndChangeToEmbedUrl from '@utils/embedUrl';

export default function UrlAddButton() {
  const [view, setView] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleToggleView = useCallback(() => {
    setView((prev) => !prev);
  }, []);

  const handleChangeUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);

  const handleSubmitUrl = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(false);

      checkExistenceOfScheme(url)
        ? dispatch(add({ url: checkYoutubeAndChangeToEmbedUrl(url), time: new Date().getTime() }))
        : setError(true);
      setUrl('');
    },
    [dispatch, url],
  );

  const handleCloseUrl = useCallback(() => {
    setView(false);
    setUrl('');
    setError(false);
  }, []);

  return (
    <>
      <button type="submit" onClick={handleToggleView}>
        URL 추가
      </button>

      {view && (
        <form onSubmit={handleSubmitUrl}>
          <input type="text" value={url} onChange={handleChangeUrl} onBlur={handleCloseUrl} />
          {error && <p>올바른 형식의 URL을 입력하세요</p>}
        </form>
      )}
    </>
  );
}

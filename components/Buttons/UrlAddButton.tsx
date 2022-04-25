import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { add } from '../../reducer/urlSlice';
import checkExistenceOfScheme from '@utils/checkExistenceOfScheme';

export default function UrlAddButton() {
  const [view, setView] = useState(false);
  const [url, setUrl] = useState('https://');
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

      checkExistenceOfScheme(url)
        ? dispatch(add({ url, time: new Date().getTime() }))
        : dispatch(add({ url: `https://${url}`, time: new Date().getTime() }));
      setUrl('');
    },
    [dispatch, url],
  );

  return (
    <>
      <button type="submit" onClick={handleToggleView}>
        URL 추가
      </button>

      {view && (
        <form onSubmit={handleSubmitUrl}>
          <input type="text" value={url} onChange={handleChangeUrl} />
        </form>
      )}
    </>
  );
}

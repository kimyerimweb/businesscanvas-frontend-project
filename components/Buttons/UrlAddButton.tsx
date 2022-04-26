import React, { useState, useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { add } from '../../reducer/urlSlice';
import checkExistenceOfScheme from '@utils/scheme';
import checkYoutubeAndChangeToEmbedUrl from '@utils/embedUrl';

import { UrlButton, Input, Form } from '@components/Buttons/style';

export default function UrlAddButton() {
  const [view, setView] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleToggleView = useCallback(() => {
    setView((prev) => !prev);
  }, []);

  const handleChangeUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setUrl(e.target.value);
  }, []);

  const handleSubmitUrl = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setView(false);
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
      <div style={{ position: 'relative' }}>
        <UrlButton type="button" onClick={handleToggleView}>
          URL 추가
        </UrlButton>

        {view && (
          <Form onSubmit={handleSubmitUrl}>
            <Input type="text" value={url} onChange={handleChangeUrl} onBlur={handleCloseUrl} />
            {error && <p>올바른 형식의 URL을 입력하세요</p>}
          </Form>
        )}
      </div>
    </>
  );
}

import React, { useCallback, useState, useRef, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { add } from '../../reducer/urlSlice';
import checkExistenceOfScheme from '@utils/scheme';
import checkYoutubeAndChangeToEmbedUrl from '@utils/embedUrl';

import { Form, Input } from '@components/Forms/style';

interface UrlAddFormProps {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UrlAddForm({ view, setView }: UrlAddFormProps) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [url, setUrl] = useState('');

  const urlInputRef = useRef<any>();
  useEffect(() => {
    if (view) {
      urlInputRef.current.focus();
    }
  }, [view]);

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
    [dispatch, url, setView],
  );

  const handleChangeUrl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(false);
  }, []);

  const handleCloseUrl = useCallback(() => {
    setView(false);
    setUrl('');
  }, [setView]);

  return (
    <Form onSubmit={handleSubmitUrl}>
      <Input type="text" value={url} onChange={handleChangeUrl} onBlur={handleCloseUrl} ref={urlInputRef} />
      {error && <p>올바른 형식의 URL을 입력하세요</p>}
    </Form>
  );
}

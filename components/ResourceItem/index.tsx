import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { urlInfo } from '@typings/url';
import { imageInfo } from '@typings/image';
import { remove as removeImage } from '../../reducer/imageSlice';
import { remove as removeUrl, edit as editUrl } from '../../reducer/urlSlice';
import checkExistenceOfScheme from '@utils/checkExistenceOfScheme';

interface ResourceItemProps {
  resource: urlInfo | imageInfo;
}

export default function ResourceItem({ resource }: ResourceItemProps) {
  const [view, setView] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleToggleInput = useCallback(() => {
    if (view) {
      if ('url' in resource) {
        checkExistenceOfScheme(text)
          ? dispatch(
              editUrl({
                urlInfo: resource,
                newUrl: text,
              }),
            )
          : dispatch(
              editUrl({
                urlInfo: resource,
                newUrl: `https://${text}`,
              }),
            );
      }
      setText('');
    }
    setView((prev) => !prev);
  }, [resource, dispatch, text, view]);

  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleEditResource = useCallback(() => {
    if ('url' in resource) {
      resource.url = text;
      dispatch(
        editUrl({
          urlInfo: resource,
          newUrl: `https://${text}`,
        }),
      );
    }
    setText('');
  }, [resource, dispatch, text]);

  const handleDeleteResource = useCallback(() => {
    'url' in resource ? dispatch(removeUrl(resource)) : dispatch(removeImage(resource));
  }, [resource, dispatch]);

  return (
    <div>
      <form onSubmit={handleEditResource}>
        {view && <input type="text" value={text} onChange={handleChangeText} />}
      </form>
      {!view && ('url' in resource ? <span>{resource.url}</span> : <span>{resource.image.name}</span>)}
      <button type="button" onClick={handleToggleInput}>
        연필
      </button>
      <button type="button" onClick={handleDeleteResource}>
        쓰레기통
      </button>
    </div>
  );
}
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { urlInfo } from '@typings/url';
import { imageInfo } from '@typings/image';
import { remove as removeImage } from '@reducer/imageSlice';
import { remove as removeUrl, edit as editUrl } from '@reducer/urlSlice';
import checkExistenceOfScheme from '@utils/scheme';
import checkYoutubeAndChangeToEmbedUrl from '@utils/embedUrl';
import { replaceValue, toggleView } from '@reducer/viewSlice';

import { Item } from '@components/ResourceItem/style';
import { TypedIcon } from 'typed-design-system';
import EditTextForm from '@components/Forms/EditTextForm';

interface ResourceItemProps {
  resource: urlInfo | imageInfo;
}

export default function ResourceItem({ resource }: ResourceItemProps) {
  const [view, setView] = useState(false);
  const [text, setText] = useState('url' in resource ? resource.url : resource.image.name);
  const dispatch = useDispatch();

  const handleToggleInput = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>) => {
      e.stopPropagation();

      if (view) {
        if ('url' in resource) {
          checkExistenceOfScheme(text)
            ? dispatch(
                editUrl({
                  urlInfo: resource,
                  newUrl: checkYoutubeAndChangeToEmbedUrl(text),
                }),
              )
            : null;
        }
        setText(checkYoutubeAndChangeToEmbedUrl(text));
      }
      setView((prev) => !prev);
    },
    [resource, dispatch, text, view],
  );

  const handleDeleteResource = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      'url' in resource ? dispatch(removeUrl(resource)) : dispatch(removeImage(resource));
    },
    [resource, dispatch],
  );

  const handleOpenViewer = useCallback(() => {
    dispatch(replaceValue(resource));
    dispatch(toggleView(true));
  }, [dispatch, resource]);

  return (
    <Item onClick={handleOpenViewer}>
      {view && <EditTextForm text={text} setText={setText} resource={resource} handleToggleInput={handleToggleInput} />}
      {!view && ('url' in resource ? <span>{resource.url}</span> : <span>{resource.image.name}</span>)}
      <div>
        <button type="button" onClick={handleToggleInput}>
          <TypedIcon icon="edit_small" style={{ fontSize: '25px' }} />
        </button>
        <button type="button" onClick={handleDeleteResource}>
          <TypedIcon icon="trash_small" style={{ fontSize: '20px' }} />
        </button>
      </div>
    </Item>
  );
}

import React, { SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { edit as editUrl } from '@reducer/urlSlice';
import { urlInfo } from '@typings/url';
import { imageInfo } from '@typings/image';
import checkExistenceOfScheme from '@utils/scheme';
import checkYoutubeAndChangeToEmbedUrl from '@utils/embedUrl';

interface EditTextFormProps {
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
  handleToggleInput: (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>) => void;
  resource: urlInfo | imageInfo;
}

export default function EditTextForm({ text, setText, resource, handleToggleInput }: EditTextFormProps) {
  const dispatch = useDispatch();

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText],
  );

  const handleEditResource = useCallback(() => {
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
  }, [resource, dispatch, text, setText]);

  return (
    <form onSubmit={handleEditResource}>
      <input
        type="text"
        value={text}
        onChange={handleChangeText}
        onBlur={handleToggleInput}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </form>
  );
}

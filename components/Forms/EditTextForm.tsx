import React, { SetStateAction, useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { edit as editUrl } from '@reducer/urlSlice';
import { urlInfo } from '@typings/url';
import { imageInfo } from '@typings/image';

interface EditTextFormProps {
  view: boolean;
  text: string;
  setView: React.Dispatch<SetStateAction<boolean>>;
  setText: React.Dispatch<SetStateAction<string>>;
  handleToggleInput: (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLInputElement>) => void;
  resource: urlInfo | imageInfo;
}

export default function EditTextForm({ view, setView, text, setText, resource, handleToggleInput }: EditTextFormProps) {
  const dispatch = useDispatch();

  const urlInputRef = useRef<any>();
  useEffect(() => {
    if (view) {
      urlInputRef.current.focus();
    }
  }, [view]);

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText],
  );

  const handleEditResource = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if ('url' in resource) {
        dispatch(
          editUrl({
            urlInfo: resource,
            newName: text,
          }),
        );
        setView(false);
      }
    },
    [resource, dispatch, text, setView],
  );

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
        ref={urlInputRef}
      />
    </form>
  );
}

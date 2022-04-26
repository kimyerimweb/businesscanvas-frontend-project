import React, { useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { add } from '../../reducer/imageSlice';

import { ImageButton } from '@components/Buttons/style';

export default function ImageAddButton() {
  const dispatch = useDispatch();

  const handleChangeImages = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        for (let i = 0; i < e.target.files.length; i++) {
          const image = e.target.files[i];
          dispatch(add({ image, time: new Date().getTime() }));
        }
      }
    },
    [dispatch],
  );

  const imageInputRef = useRef<any>();
  const handleClickUploadButton = useCallback(() => {
    imageInputRef.current.focus();
  }, []);

  return (
    <>
      <ImageButton htmlFor="images" onClick={handleClickUploadButton}>
        이미지 추가
      </ImageButton>
      <input
        type="file"
        id="images"
        accept=".jpg, .png"
        multiple
        hidden
        ref={imageInputRef}
        onChange={handleChangeImages}
      />
    </>
  );
}

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
          dispatch(add({ image: e.target.files[i], time: new Date().getTime() + i }));
          //시간이 동일하면 삭제나 수정이 되지 않는다. (컴포넌트끼리 서로 구분을 못해서 어떤 것을 건드려야할지 모르기 때문에)
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

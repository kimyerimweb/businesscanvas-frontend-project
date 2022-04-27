import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { add } from '../../reducer/imageSlice';
import PopUpMessage from '@components/PopUpMessage';

import { ImageButton } from '@components/Buttons/style';

export default function ImageAddButton() {
  const [isuploadSuccess, setIsuploadSuccess] = useState(false);
  const [isuploadFailure, setIsuploadFailure] = useState(false);
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();

  const handleChangeImages = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        for (let i = 0; i < e.target.files.length; i++) {
          const uploadTime = Math.random() * 1000;
          const image = e.target.files[i];

          if (uploadTime >= 300 && uploadTime <= 1000) {
            setIsuploadSuccess(true);
            setNumber(i);
            await setTimeout(function () {
              dispatch(add({ image, time: new Date().getTime() + i }));
            }, uploadTime);
          } else {
            setNumber(i);
            setIsuploadFailure(true);
          }
          await setTimeout(function () {
            setIsuploadSuccess(false);
            setIsuploadFailure(false);
          }, 2000);
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
      {isuploadSuccess && (
        <PopUpMessage
          message={`${number + 1}번째 사진 등록 성공`}
          handleClosePopUp={() => {
            setIsuploadSuccess(false);
          }}
        />
      )}
      {isuploadFailure && (
        <PopUpMessage
          message={`${number + 1}번째 사진 등록 실패`}
          handleClosePopUp={() => {
            setIsuploadFailure(false);
          }}
        />
      )}
    </>
  );
}

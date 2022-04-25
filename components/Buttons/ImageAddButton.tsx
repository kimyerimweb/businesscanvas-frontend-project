import React, { useState, useCallback, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { add } from '../../reducer/imageSlice';

export default function ImageAddButton() {
  const dispatch = useDispatch();
  const [images, setImages] = useState<File[]>([]);
  const [view, setView] = useState(false);

  const handleChangeImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setView(true);

    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        setImages((prev) => [...prev, file]);
      }
    }
  }, []);

  const handleUploadImages = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      images.forEach((image) => {
        dispatch(add({ image, time: new Date().getTime() }));
      });

      setImages([]);
      setView(false);
    },
    [dispatch, images],
  );

  const imageInputRef = useRef<any>();
  const handleClickUploadButton = useCallback(() => {
    imageInputRef.current.focus();
  }, []);

  return (
    <>
      <form onSubmit={handleUploadImages}>
        <label htmlFor="images" onClick={handleClickUploadButton}>
          이미지 추가
        </label>
        <input
          type="file"
          id="images"
          accept=".jpg, .png"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleChangeImages}
        />
        {view && <input type="submit" />}
      </form>
    </>
  );
}

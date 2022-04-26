import React from 'react';

import UrlAddButton from '@components/Buttons/UrlAddButton';
import ImageAddButton from '@components/Buttons/ImageAddButton';

import ResourceList from '@components/ResourceList';

import { ButtonWrapper, EditorContainer } from '@layouts/Editor/style';

export default function Editor() {
  return (
    <EditorContainer>
      <ButtonWrapper>
        <UrlAddButton />
        <ImageAddButton />
      </ButtonWrapper>
      <ResourceList />
    </EditorContainer>
  );
}

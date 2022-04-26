import React from 'react';

import Viewer from '@layouts/Viewer';
import Editor from '@layouts/Editor';

import { AppContainer } from '@layouts/App/style';

export default function App() {
  return (
    <>
      <AppContainer>
        <Editor />
        <Viewer />
      </AppContainer>
    </>
  );
}

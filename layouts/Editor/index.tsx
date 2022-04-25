import React from 'react';

import UrlAddButton from '@components/Buttons/UrlAddButton';
import ImageAddButton from '@components/Buttons/ImageAddButton';

import ResourceList from '@components/ResourceList';

export default function Editor() {
  return (
    <div>
      <div>
        <UrlAddButton />
        <ImageAddButton />
      </div>
      <div>
        <ResourceList />
      </div>
    </div>
  );
}

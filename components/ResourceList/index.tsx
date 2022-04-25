import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@store/configureStore';
import { urlInfo } from '@typings/url';
import { imageInfo } from '@typings/image';

import ResourceItem from '@components/ResourceItem';

export default function ResourceList() {
  const urls = useSelector((state: RootState) => state.urls.value);
  const images = useSelector((state: RootState) => state.images.value);

  const [resources, setResources] = useState<(imageInfo | urlInfo)[]>([]);

  useEffect(() => {
    setResources([...urls, ...images]);
  }, [urls, images]);

  return (
    <ol>
      {resources
        .sort((a, b) => b.time - a.time)
        .map((resource) => (
          <ResourceItem key={resource.time} resource={resource} />
        ))}
    </ol>
  );
}

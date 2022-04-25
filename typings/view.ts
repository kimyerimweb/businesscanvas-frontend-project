import { imageInfo } from './image';
import { urlInfo } from './url';

export interface viewState {
  value: imageInfo | urlInfo | null;
  view: boolean;
}

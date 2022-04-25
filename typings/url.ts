export interface urlInfo {
  url: string;
  time: number;
}

export interface urlState {
  value: urlInfo[];
}

export interface editUrlProps {
  urlInfo: urlInfo;
  newUrl: string;
}

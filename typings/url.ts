export interface urlInfo {
  url: string;
  name: string;
  time: number;
}

export interface urlState {
  value: urlInfo[];
}

export interface editUrlProps {
  urlInfo: urlInfo;
  newName: string;
}
